/* eslint-env mocha */

const { Readable, Writable } = require('stream');
const expect = require('expect');
const timeout = require('timeout-as-promise');
const streamsToPromise = require('../build/index.js');

const { all, race } = streamsToPromise;
const { entries } = Object;

entries({ all, race }).forEach(([name, func]) => {

    describe(name, () => {

        it('exists', () => {
            expect(func).toBeA('function');
        });

        it('returns a promise', () => {
            expect(func()).toBeA(Promise);
        });

        it('rejects on stream errors', async function () {

            this.timeout(10);

            const err = Error();
            const s = new Readable();
            s._read = () => {};
            setTimeout(() => { s.emit('error', err); });

            await func(s).then(
                () => Promise.reject(Error(`\`${name}\` did not rejeect`)),
                (e) => { expect(e).toBe(err); }
            );

        });

    });

});

describe('all', () => {

    it('is the default export', () => {
        expect(streamsToPromise).toBe(all);
    });

    it('resolves all stream data in an array', async function () {

        this.timeout(100);

        // empty
        const s1 = new Readable();
        s1._read = () => {};
        setTimeout(() => { s1.emit('end'); });

        // buffer data
        const s2 = new Readable();
        s2._read = () => {};
        setTimeout(async () => {
            s2.emit('data', new Buffer('foo'));
            await timeout(10);
            s2.emit('data', new Buffer('bar'));
            await timeout(5);
            s2.emit('end');
        });

        // buffers and strings
        const s3 = new Readable();
        s3._read = () => {};
        setTimeout(async () => {
            s3.emit('data', new Buffer('foo'));
            await timeout(3);
            s3.emit('data', 'bar');
            s3.emit('end');
        });

        // object streams
        const s4 = new Readable({ objectMode: true });
        s4._read = () => {};
        setTimeout(async () => {
            s4.emit('data', { foo: 'bar' });
            s4.emit('data', { baz: 'qux' });
            await timeout(3);
            s4.emit('end');
        });

        // writable streams
        const s5 = new Writable();
        s5._read = () => {};
        setTimeout(() => { s5.emit('finish'); });

        const res = await all(s1, s2, s3, s4, s5);

        expect(res).toBeA(Array);
        expect(res).toMatch({ length: 5 });

        const [r1, r2, r3, r4, r5] = res;

        expect(r1).toBeA(Buffer);
        expect(r1.length).toBe(0);

        expect(r2).toBeA(Buffer);
        expect(String(r2)).toBe('foobar');

        expect(r3).toBeA(Buffer);
        expect(String(r3)).toBe('foobar');

        expect(r4).toBeA(Array);
        expect(r4).toMatch({
            0: { foo: 'bar' },
            1: { baz: 'qux' },
            length: 2
        });

        expect(r5).toBe(undefined);

    });

});

describe('race', () => {

    it('resolves data of the stream that concludes first', async function () {

        this.timeout(100);

        const s1 = new Readable();
        s1._read = () => {};
        setTimeout(async () => {
            s1.emit('data', 'foo');
            await timeout(10);
            s1.emit('data', 'bar');
            await timeout(5);
            s1.emit('end');
        });

        const s2 = new Readable();
        s2._read = () => {};
        setTimeout(async () => {
            s2.emit('data', 'baz');
            await timeout(3);
            s2.emit('data', 'qux');
            s2.emit('end');
        });

        const res = await race(s1, s2);

        expect(res).toBeA(Buffer);
        expect(String(res)).toBe('bazqux');

    });

});

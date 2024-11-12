import { randomInt } from 'crypto'
import AbstractSpruceTest, {
    test,
    assert,
    errorAssert,
} from '@sprucelabs/test-utils'
import { SpyFirBandpassFilter } from '@neurodevs/node-signal-processing'
import PpgPeakDetector from '../components/PpgPeakDetector'
import SpyPpgPeakDetector from '../testDoubles/SpyPpgPeakDetector'
import { PpgPeakDetectorOptions } from '../types'

export default class PpgPeakDetectorTest extends AbstractSpruceTest {
    private static randomDetector: SpyPpgPeakDetector
    private static randomOptions: PpgPeakDetectorOptions
    private static rawData: number[]
    private static timestamps: number[]

    protected static async beforeEach() {
        PpgPeakDetector.FilterClass = SpyFirBandpassFilter
        SpyFirBandpassFilter.clear()

        this.randomOptions = this.generateRandomOptions()
        this.randomDetector = new SpyPpgPeakDetector(this.randomOptions)

        this.rawData = [1, 2, 3, 4]
        this.timestamps = [4, 5, 6, 7]
    }

    @test()
    protected static async throwsWithMissingRequiredOptions() {
        // @ts-ignore
        const err = assert.doesThrow(() => new PpgPeakDetector())
        errorAssert.assertError(err, 'MISSING_PARAMETERS', {
            parameters: ['sampleRate'],
        })
    }

    @test('works with sampleRate: 100, numTaps: 401', 100, 401)
    @test('works with sampleRate: 100.5, numTaps: 401', 100.5, 401)
    protected static async numTapsEqualsSampleRateTimesFourPlusOne(
        sampleRate: number,
        expectedNumTaps: number
    ) {
        const detector = new SpyPpgPeakDetector({ sampleRate })
        assert.isEqual(detector.getNumTaps(), expectedNumTaps)
    }

    @test()
    protected static async runCallsDependenciesAsExpected() {
        this.run()
        assert.isEqual(SpyFirBandpassFilter.runHitCount, 1)
    }

    @test()
    protected static async runReturnsRawDataWithoutFirstSample() {
        const result = this.run()
        assert.isEqualDeep(result.rawData, this.rawData.slice(1))
        assert.isEqualDeep(result.timestamps, this.timestamps.slice(1))
    }

    private static run() {
        return this.randomDetector.run(this.rawData, this.timestamps)
    }

    private static generateRandomOptions() {
        return {
            sampleRate: 100 * Math.random(),
            lowCutoffHz: randomInt(1, 5) * Math.random(),
            highCutoffHz: 10 + randomInt(1, 5) * Math.random(),
            numTaps: this.generateValidNumTaps(),
            attenuation: 100 * Math.random(),
        }
    }

    private static generateValidNumTaps() {
        let numTaps = randomInt(51, 101)
        const numTapsIsOdd = numTaps % 2 !== 0

        if (!numTapsIsOdd) {
            numTaps++
        }
        return numTaps
    }
}

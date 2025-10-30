import AbstractModuleTest, { test, assert } from '@neurodevs/node-tdd'

import PpgAnalyzerImpl from '../../impl/PpgAnalyzer.js'
import PpgPeakDetectionGrapher, {
    PeakDetectionGrapher,
} from '../../impl/PpgPeakDetectionGrapher.js'
import PpgPeakDetector from '../../impl/PpgPeakDetector.js'
import SpyPpgAnalyzer from '../../testDoubles/SpyPpgAnalyzer.js'
import SpyPpgPeakDetector from '../../testDoubles/SpyPpgPeakDetector.js'
import { PpgAnalyzerOptions } from '../../types.js'
import expectedOutput from '../testData/expectedOutput.js'
import loadPpgData from '../testData/loadPpgData.js'

export default class PpgAnalyzerTest extends AbstractModuleTest {
    private static analyzer: SpyPpgAnalyzer
    private static analyzerOptions: PpgAnalyzerOptions
    private static grapher: PeakDetectionGrapher

    private static shouldSavePngs = true

    protected static async beforeEach() {
        PpgPeakDetector.Class = SpyPpgPeakDetector
        SpyPpgPeakDetector.resetTestDouble()

        PpgAnalyzerImpl.Class = SpyPpgAnalyzer

        this.analyzerOptions = this.generateRandomOptions()
        this.analyzer = this.PpgAnalyzer(this.analyzerOptions)
        this.grapher = this.PpgPeakDetectionGrapher()
    }

    @test()
    protected static async constructorCanOverridePpgPeakDetector() {
        SpyPpgPeakDetector.resetTestDouble()
        PpgAnalyzerImpl.Create(this.analyzerOptions)
        assert.isEqual(SpyPpgPeakDetector.callsToConstructor.length, 1)
    }

    @test()
    protected static async hrvCalculationIgnoresRrIntervalOutliers() {
        // We want to ignore rr intervals 700 -> 1200 and 1100 -> 500
        const rrIntervals = [600, 700, 1200, 800, 500, 600, 700, 800]

        const result = this.analyzer.calculateHeartRateVariability(rrIntervals)
        assert.isEqual(result, 100)
    }

    @test(
        'Works with: ppg-example-4-subject-3.csv',
        'ppg-example-4-subject-3.csv'
    )
    @test(
        'Works with: ppg-example-3-subject-3.csv',
        'ppg-example-3-subject-3.csv'
    )
    @test(
        'Works with: ppg-example-2-subject-2.csv',
        'ppg-example-2-subject-2.csv'
    )
    @test(
        'Works with: ppg-example-1-subject-1.csv',
        'ppg-example-1-subject-1.csv'
    )
    protected static async runWorksWithActualPpgData(fileName: string) {
        const expected = expectedOutput.find((item) =>
            item.fileName.endsWith(fileName)
        ) as any

        const { values, timestamps } = await loadPpgData(fileName)
        const analyzer = new SpyPpgAnalyzer({ sampleRate: 64 })
        const result = analyzer.run(values, timestamps)
        const { signals, metrics } = result
        const {
            rrIntervals,
            hrvMean,
            hrMean,
            hrvPercentChange,
            hrPercentChange,
        } = metrics

        if (this.shouldSavePngs) {
            await this.grapher.run(
                `src/__tests__/testData/${fileName}.plot.png`,
                signals
            )
        }

        assert.isTruthy(signals)
        assert.isTruthy(metrics)
        assert.isLength(rrIntervals, expected.numPeaks)
        assert.isEqualDeep(rrIntervals, expected.rrIntervals)
        assert.isEqual(hrvMean, expected.hrvMean)
        assert.isEqual(hrMean, expected.hrMean)
        assert.isEqual(hrvPercentChange, expected.hrvPercentChange)
        assert.isEqual(hrPercentChange, expected.hrPercentChange)
    }

    private static generateRandomOptions() {
        return { sampleRate: 100 * Math.random() }
    }

    private static PpgAnalyzer(options?: Partial<PpgAnalyzerOptions>) {
        const defaultOptions = this.generateRandomOptions()

        return PpgAnalyzerImpl.Create({
            ...defaultOptions,
            ...options,
        }) as SpyPpgAnalyzer
    }

    private static PpgPeakDetectionGrapher() {
        return PpgPeakDetectionGrapher.Create()
    }
}

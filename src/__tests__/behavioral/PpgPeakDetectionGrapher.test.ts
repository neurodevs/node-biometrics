import AbstractSpruceTest, {
    test,
    assert,
    generateId,
} from '@sprucelabs/test-utils'
import { FakeSubplotGrapher } from '@neurodevs/node-server-plots'
import PpgPeakDetectionGrapher from '../../PpgPeakDetectionGrapher'
import { PpgPeakDetectorResults } from '../../types/nodeBiometrics.types'

export default class PpgPeakDetectionGrapherTest extends AbstractSpruceTest {
    private static grapher: PpgPeakDetectionGrapher
    private static savePath: string
    private static signals: PpgPeakDetectorResults
    private static dataLength: number

    protected static async beforeEach() {
        await super.beforeEach()

        PpgPeakDetectionGrapher.GrapherClass = FakeSubplotGrapher

        this.savePath = `${generateId()}.plot.png`
        this.dataLength = 4

        this.signals = {
            rawData: this.generateRandomArray(this.dataLength),
            filteredData: this.generateRandomArray(this.dataLength),
            timestamps: this.generateRandomArray(this.dataLength),
            upperAnalyticSignal: this.generateRandomArray(this.dataLength),
            upperEnvelope: this.generateRandomArray(this.dataLength),
            lowerAnalyticSignal: this.generateRandomArray(this.dataLength),
            lowerEnvelope: this.generateRandomArray(this.dataLength),
            thresholdedData: this.generateRandomArray(this.dataLength),
            segmentedData: [],
            peaks: [],
        } as PpgPeakDetectorResults

        this.grapher = this.Grapher()
        assert.isTruthy(this.grapher)
    }

    @test()
    protected static async callsSubplotGrapherWithRequiredOptions() {
        await this.run()

        assert.isEqualDeep(FakeSubplotGrapher.constructorCalledWith[0], {
            subplotHeight: 600,
            subplotWidth: 4000,
        })

        assert.isEqualDeep(FakeSubplotGrapher.generateCalledWith[0], {
            savePath: this.savePath,
            plotConfigs: this.plotConfigs as any,
        })
    }

    private static generateRandomArray(length: number) {
        return Array.from({ length }, () => Math.random())
    }

    private static get plotConfigs() {
        const minTimestamp = Math.min(...this.timestamps)

        const normalizedTimestamps = this.timestamps.map(
            (timestamp) => (timestamp - minTimestamp) / 1000
        )

        const {
            rawDataset,
            filteredDataset,
            upperEnvelopeDataset,
            lowerEnvelopeDataset,
            thresholdedDataset,
        } = this.generateDatasets(normalizedTimestamps)

        const peakTimestamps = this.signals.peaks.map((peak) =>
            ((peak.timestamp - minTimestamp) / 1000)?.toString()
        )

        return [
            {
                title: 'Raw PPG Data',
                datasets: [rawDataset],
            },
            {
                title: 'Filtered PPG Data (0.4-4 Hz Bandpass)',
                datasets: [filteredDataset],
            },
            {
                title: 'Upper Envelope (Hilbert)',
                datasets: [filteredDataset, upperEnvelopeDataset],
            },
            {
                title: 'Lower Envelope (Hilbert)',
                datasets: [
                    filteredDataset,
                    upperEnvelopeDataset,
                    lowerEnvelopeDataset,
                ],
            },
            {
                title: 'Thresholded PPG Data by Lower Envelope',
                datasets: [thresholdedDataset, lowerEnvelopeDataset],
            },
            {
                title: 'Peak Detection',
                datasets: [thresholdedDataset],
                verticalLines: peakTimestamps,
            },
            {
                title: 'Peak Detection Overlay on Raw Data',
                datasets: [rawDataset],
                verticalLines: peakTimestamps,
            },
        ]
    }

    private static generateDatasets(normalizedTimestamps: number[]) {
        const rawDataFormatted = this.formatData(
            this.rawData,
            normalizedTimestamps
        )
        const filteredDataFormatted = this.formatData(
            this.filteredData,
            normalizedTimestamps
        )
        const upperEnvelopeFormatted = this.formatData(
            this.upperEnvelope,
            normalizedTimestamps
        )
        const lowerEnvelopeFormatted = this.formatData(
            this.lowerEnvelope,
            normalizedTimestamps
        )
        const thresholdedDataFormatted = this.formatData(
            this.thresholdedData,
            normalizedTimestamps
        )

        return {
            rawDataset: {
                label: 'Raw PPG Data',
                data: rawDataFormatted,
                color: 'cornflowerblue',
            },
            filteredDataset: {
                label: 'Filtered PPG Data',
                data: filteredDataFormatted,
                color: 'cornflowerblue',
            },
            upperEnvelopeDataset: {
                label: 'Upper Envelope',
                data: upperEnvelopeFormatted,
                color: 'forestgreen',
            },
            lowerEnvelopeDataset: {
                label: 'Lower Envelope',
                data: lowerEnvelopeFormatted,
                color: 'goldenrod',
            },
            thresholdedDataset: {
                label: 'Thresholded PPG Data',
                data: thresholdedDataFormatted,
                color: 'salmon',
            },
        }
    }

    private static get rawData() {
        return this.signals.rawData
    }

    private static get filteredData() {
        return this.signals.filteredData
    }

    private static get upperEnvelope() {
        return this.signals.upperEnvelope
    }

    private static get lowerEnvelope() {
        return this.signals.lowerEnvelope
    }

    private static get thresholdedData() {
        return this.signals.thresholdedData
    }

    private static get timestamps() {
        return this.signals.timestamps
    }

    private static formatData(data: number[], timestamps: number[]) {
        return data.map((value, i) => {
            return {
                x: timestamps[i].toString(),
                y: value,
            }
        })
    }

    private static async run() {
        await this.grapher.run(this.savePath, this.signals)
    }

    private static Grapher() {
        return new PpgPeakDetectionGrapher()
    }
}

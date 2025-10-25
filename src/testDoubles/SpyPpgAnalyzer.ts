import PpgAnalyzerImpl from '../impl/PpgAnalyzer'
import { PpgAnalyzerOptions } from '../types'

export default class SpyPpgAnalyzer extends PpgAnalyzerImpl {
    public constructor(options: PpgAnalyzerOptions) {
        super(options)
    }

    public getSampleRate() {
        return this.sampleRate
    }

    public getDetector() {
        return this.detector
    }

    public calculateHeartRateVariability(rrIntervals: number[]) {
        return super.calculateHeartRateVariability(rrIntervals)
    }
}

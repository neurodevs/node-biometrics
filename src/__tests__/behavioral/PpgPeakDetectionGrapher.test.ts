import AbstractSpruceTest, { test, assert } from '@sprucelabs/test-utils'
import {
	FakeChartJSNodeCanvas,
	SubplotGrapher,
	fakeSharp,
} from '@neurodevs/node-server-plots'
import { PpgPeakDetectionGrapher } from '../../PpgPeakDetectionGrapher'

export default class PpgPeakDetectionGrapherTest extends AbstractSpruceTest {
	private static grapher: PpgPeakDetectionGrapher

	protected static async beforeEach() {
		await super.beforeEach()

		SubplotGrapher.CanvasClass = FakeChartJSNodeCanvas
		SubplotGrapher.sharp = fakeSharp

		this.grapher = this.Grapher()
		assert.isTruthy(this.grapher)
	}

	@test()
	protected static async extendsSubplotGrapher() {
		assert.isInstanceOf(this.grapher, SubplotGrapher)
	}

	private static Grapher() {
		return new PpgPeakDetectionGrapher({
			subplotHeight: 300,
			subplotWidth: 800,
		})
	}
}

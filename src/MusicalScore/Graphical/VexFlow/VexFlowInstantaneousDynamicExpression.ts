import { GraphicalInstantaneousDynamicExpression } from "../GraphicalInstantaneousDynamicExpression";
import { InstantaneousDynamicExpression, DynamicEnum } from "../../VoiceData/Expressions/InstantaneousDynamicExpression";
import { GraphicalLabel } from "../GraphicalLabel";
import { Label } from "../../Label";
import { TextAlignmentEnum } from "../../../Common/Enums/TextAlignment";
import { EngravingRules } from "../EngravingRules";
import { FontStyles } from "../../../Common/Enums/FontStyles";
import { StaffLine } from "../StaffLine";
import { GraphicalMeasure } from "../GraphicalMeasure";

export class VexFlowInstantaneousDynamicExpression extends GraphicalInstantaneousDynamicExpression {
    private mLabel: GraphicalLabel;

    constructor(instantaneousDynamicExpression: InstantaneousDynamicExpression, staffLine: StaffLine, measure: GraphicalMeasure) {
        super(instantaneousDynamicExpression, staffLine, measure);

        let labelAlignment: TextAlignmentEnum = TextAlignmentEnum.CenterTop;
        if (EngravingRules.Rules.CompactMode) {
            labelAlignment = TextAlignmentEnum.LeftBottom;
        }
        this.mLabel = new GraphicalLabel(new Label(this.Expression, labelAlignment),
                                         EngravingRules.Rules.ContinuousDynamicTextHeight,
                                         labelAlignment,
                                         this.PositionAndShape);

        this.mLabel.Label.fontStyle = FontStyles.BoldItalic;
        this.mLabel.setLabelPositionAndShapeBorders();
        this.PositionAndShape.calculateBoundingBox();
    }

    get InstantaneousDynamic(): InstantaneousDynamicExpression {
        return this.mInstantaneousDynamicExpression;
    }

    get Expression(): string {
        return DynamicEnum[this.mInstantaneousDynamicExpression.DynEnum];
    }

    get Label(): GraphicalLabel {
        return this.mLabel;
    }
}

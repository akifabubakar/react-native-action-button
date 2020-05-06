import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  StyleSheet,
  Text,
  View,
  Animated,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";
import {
  shadowStyle,
  alignItemsMap,
  getTouchableComponent,
  isAndroid,
  touchableBackground,
  DEFAULT_ACTIVE_OPACITY
} from "./shared";

const { width: WIDTH } = Dimensions.get("window");
const SHADOW_SPACE = 10;
const TEXT_HEIGHT = 22;

const TextTouchable = isAndroid
  ? TouchableNativeFeedback
  : TouchableWithoutFeedback;

export default class ActionButtonItem extends Component {
  static get defaultProps() {
    return {
      active: true,
      spaceBetween: 15,
      useNativeFeedback: true,
      activeOpacity: DEFAULT_ACTIVE_OPACITY,
      fixNativeFeedbackRadius: false,
      nativeFeedbackRippleColor: "rgba(255,255,255,0.75)",
      numberOfLines: 1,
    };
  }

  static get propTypes() {
    return {
      active: PropTypes.bool,
      useNativeFeedback: PropTypes.bool,
      fixNativeFeedbackRadius: PropTypes.bool,
      nativeFeedbackRippleColor: PropTypes.string,
      activeOpacity: PropTypes.number,
      numberOfLines: PropTypes.number,
    };
  }

  render() {
    const {
      size,
      position,
      verticalOrientation,
      hideShadow,
      spacing,
      orientation,
      anim,
      active,
      buttonColor,
      btnColor,
      parentSize,
      useNativeFeedback,
      fixNativeFeedbackRadius,
      offsetX,
      testID,
      accessibilityLabel,
      nativeFeedbackRippleColor,
      activeOpacity,
      onPress,
      children,
      horizontalOrientation,
      horizontalSpacing
    } = this.props;

    if (!active) return null;

    const translate = orientation == "vertical"? "translateY":"translateX";

    const animatedViewStyle = {
      marginBottom: -SHADOW_SPACE,
      alignItems: alignItemsMap[position],

      // backgroundColor: this.props.buttonColor,
      opacity: anim,
      transform: [
        {
          [translate]: anim.interpolate({
            inputRange: [0, 1],
            outputRange: orientation==="vertical" ? [verticalOrientation === "down" ? -40 : 40, 0] : [horizontalOrientation === "right"? -40 : 40, 0]
          })
        }
      ]
    };

    const buttonStyle = {
      justifyContent: "center",
      alignItems: "center",
      width: size,
      height: size,
      borderRadius: size / 2,
      backgroundColor: buttonColor || btnColor
    };

    if (position !== "center")
      buttonStyle[position] = (parentSize - size) / 2;

    const Touchable = getTouchableComponent(useNativeFeedback);

    const parentStyle = isAndroid &&
      fixNativeFeedbackRadius
      ? {
          height: size,
          marginBottom: spacing,
          right: offsetX,
          borderRadius: size / 2
        }
      : {
          justifyContent: orientation == "vertical" ? null:"center", 
          paddingLeft:orientation == "vertical" ? offsetX : horizontalOrientation === "left"? horizontalSpacing : 0,
          paddingRight: orientation == "vertical" ? offsetX : horizontalOrientation === "right"? horizontalSpacing : 0,
          height: size + SHADOW_SPACE + spacing
        };
    return (
      <Animated.View
        pointerEvents="box-none"
        style={[animatedViewStyle, parentStyle]}
      >
        <View>
          <Touchable
            rejectResponderTermination
            testID={testID}
            accessibilityLabel={accessibilityLabel}
            background={touchableBackground(
              nativeFeedbackRippleColor,
              fixNativeFeedbackRadius
            )}
            activeOpacity={activeOpacity || DEFAULT_ACTIVE_OPACITY}
            onPress={onPress}
          >
            <View style={[
              buttonStyle,
              !hideShadow ? {...shadowStyle, ...this.props.shadowStyle} : null
            ]}>
              {children}
            </View>
          </Touchable>
        </View>
        {orientation != "horizontal" && this._renderTitle()}
      </Animated.View>
    );
  }

  _renderTitle() {
    if (!this.props.title) return null;

    const {
      textContainerStyle,
      hideLabelShadow,
      offsetX,
      parentSize,
      size,
      position,
      spaceBetween,
      numberOfLines,
      orientation
    } = this.props;
    const offsetTop = Math.max(size / 2 - TEXT_HEIGHT / 2, 0);
    const positionStyles = { top: offsetTop };
    const hideShadow = hideLabelShadow === undefined
      ? this.props.hideShadow
      : hideLabelShadow;

    if (orientation == "vertical"){
      if (position !== "center") {
        positionStyles[position] =
          offsetX + (parentSize - size) / 2 + size + spaceBetween;
      } else {
        positionStyles.right = WIDTH / 2 + size / 2 + spaceBetween;
      }
    }else{
      positionStyles = {};
    }

    const textStyles = [
      styles.textContainer,
      positionStyles,
      !hideShadow && shadowStyle,
      textContainerStyle,
      // {marginBottom:5}
    ];

    const title = (
      React.isValidElement(this.props.title) ?
        this.props.title
      : (
        <Text
          allowFontScaling={false}
          style={[styles.text, this.props.textStyle]}
          numberOfLines={numberOfLines}
        >
          {this.props.title}
        </Text>
      )
    )

    return (
      <TextTouchable
        rejectResponderTermination
        background={touchableBackground(
          this.props.nativeFeedbackRippleColor,
          this.props.fixNativeFeedbackRadius
        )}
        activeOpacity={this.props.activeOpacity || DEFAULT_ACTIVE_OPACITY}
        onPress={this.props.onPress}
      >
        <View style={textStyles}>
          {title}
        </View>
      </TextTouchable>
    );
  }
}

const styles = StyleSheet.create({
  textContainer: {
    position: "absolute",
    paddingVertical: isAndroid ? 2 : 3,
    paddingHorizontal: 8,
    borderRadius: 3,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#eee",
    backgroundColor: "white",
    height: TEXT_HEIGHT
  },
  text: {
    flex: 1,
    fontSize: 12,
    color: "#444"
  }
});

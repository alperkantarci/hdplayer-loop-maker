import { createElement } from "react";

const PlayModeAttr = (props) =>
  createElement("Attribute", { Name: "PlayMode" }, "LoopTime");

const PlayTimesAttr = (props) =>
  createElement("Attribute", { Name: "PlayTimes" }, 1);

const NameAttr = (props) =>
  createElement("Attribute", { Name: "__NAME__" }, props.name);

const HeightAttr = (props) =>
  createElement("Attribute", { Name: "Height" }, props.height);

const WidthAttr = (props) =>
  createElement("Attribute", { Name: "Width" }, props.width);

const AlphaAttr = (props) =>
  createElement("Attribute", { Name: "Alpha" }, props.alpha);

const AudioCodecAttr = (props) =>
  createElement("Attribute", { Name: "AudioCodec" }, props.codec);

const AudioCodecIdAttr = (props) =>
  createElement("Attribute", { Name: "AudioCodecID" }, props.id);

// 19884
const BitRateAttr = (props) =>
  createElement("Attribute", { Name: "BitRate" }, props.bitrate);

// isom
const CodecIdAttr = (props) =>
  createElement("Attribute", { Name: "CodecID" }, props.id);

// 1080
const FHeightAttr = (props) =>
  createElement("Attribute", { Name: "FHeight" }, props.height);

// 30
const FpsAttr = (props) =>
  createElement("Attribute", { Name: "FPS" }, props.fps);

// 1920
const FWidthAttr = (props) =>
  createElement("Attribute", { Name: "FWidth" }, props.width);

// 100
const VolumeAttr = (props) =>
  createElement("Attribute", { Name: "Volume" }, props.volume);

// MPEG-4
const StreamFormatAttr = (props) =>
  createElement("Attribute", { Name: "StreamFormat" }, props.format);

// AVC
const VideoFormatAttr = (props) =>
  createElement("Attribute", { Name: "VideoFormat" }, props.format);

// Baseline@L4.1
const VideoProfileAttr = (props) =>
  createElement("Attribute", { Name: "VideoProfile" }, props.profile);

// 2
const VideoQualityAttr = (props) =>
  createElement("Attribute", { Name: "VideoQuality" }, props.quality);

// 217
const SourceFileTimeAttr = (props) =>
  createElement("Attribute", { Name: "SourceFileTime" }, props.time);

// adLength * 10
const HoldTimeAttr = (props) =>
  createElement("Attribute", { Name: "HoldTime" }, props.time);

export {
  PlayModeAttr,
  PlayTimesAttr,
  NameAttr,
  HeightAttr,
  WidthAttr,
  AlphaAttr,
  AudioCodecAttr,
  AudioCodecIdAttr,
  BitRateAttr,
  CodecIdAttr,
  FHeightAttr,
  FpsAttr,
  FWidthAttr,
  VolumeAttr,
  StreamFormatAttr,
  VideoFormatAttr,
  VideoProfileAttr,
  VideoQualityAttr,
  SourceFileTimeAttr,
  HoldTimeAttr,
};

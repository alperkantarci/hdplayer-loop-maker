import { useEffect, useState } from "react";
import "./App.css";
import data from "./data";
import ReactDomServer from "react-dom/server";
import {
  HdControllerPlugin,
  ControllerNameAttribute,
  CONTROLLER_HEIGHT,
  CONTROLLER_WIDTH,
  ControllerDeviceModelAttribute,
} from "./constants/hdplayer-xml-controller";
import { HdOrdinaryScenePlugin } from "./constants/hdplayer-xml-scene";
import { HdFramePlugin } from "./constants/hdplayer-xml-frame";
import { HdVideoPlugin } from "./constants/hdplayer-xml-video";
import { HdPhotoPlugin } from "./constants/hdplayer-xml-photo";
import { FileList } from "./constants/hdplayer-xml-file-list";
import { ListItem } from "./constants/hdplayer-xml-list-item";
import {
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
} from "./constants/hdplayer-xml-attributes";
import { filesDir, timeType } from "./constants/app-constants";
import AdRow from "./components/AdRow";
import { totalAdvertisementTime } from "./constants/app-constants";

function App() {
  const localStorageAds = JSON.parse(localStorage.getItem('ads')) || [];
  const [ads, setAds] = useState(localStorageAds);

  const [filesDirectory, setFilesDirectory] = useState(filesDir);
  const [totalAdvTime, setTotalAdvTime] = useState(totalAdvertisementTime);
  const [totalLength, setTotalLength] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const [totalTimes, setTotalTimes] = useState(0);
  const [loopXTimes, setLoopXTimes] = useState(0);
  const [videoFrames, setVideoFrames] = useState([]);
  const [totalAdvTimeLeft, setTotalAdvTimeLeft] = useState(totalAdvTime);
  const scenes = [];

  
  function download(filename, text) {
    var blob = new Blob([text], { type: "application/xml" });
    var url = window.URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
  }

  function toTitleCase(str) {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  useEffect(() => {
    console.log({ adsChangedEffect: 1 });
    const totalLength = ads.reduce((prev, next) => prev + next.length, 0);
    setTotalLength(totalLength);
    const totalDuration = ads.reduce((prev, next) => prev + next.duration, 0);
    setTotalDuration(totalDuration);

    const totalTimes = ads.reduce(
      (prev, next) => prev + next.duration / next.length,
      0
    );
    setTotalTimes(totalTimes.toFixed(2));
    setLoopXTimes((totalAdvTime / totalLength).toFixed(2));

    localStorage.setItem('ads', JSON.stringify(ads));
  }, [ads, totalAdvTime]);

  function saveFile() {
    calculate();

    const elementXML = ReactDomServer.renderToStaticMarkup(
      <HdControllerPlugin>
        <ControllerDeviceModelAttribute></ControllerDeviceModelAttribute>
        <ControllerNameAttribute></ControllerNameAttribute>
        <HeightAttr height={CONTROLLER_HEIGHT}></HeightAttr>
        <WidthAttr width={CONTROLLER_WIDTH}></WidthAttr>
        {scenes}
      </HdControllerPlugin>
    );
    download("ad.boo", elementXML);
  }

  async function calculate() {
    console.log({ ads });
    console.log({ totalAdvTime, totalLength });

    const videoFrames = [];
    let advTimeLeft = totalAdvTime;

    for (let index = 0; index < loopXTimes; index++) {
      const frame = [];
      for (let k = 0; k < ads.length; k++) {
        const ad = ads[k];
        console.log({ ad });

        const adXTimes = ad.duration / ad.length - index;
        frame.push(adXTimes);
        advTimeLeft -= ad.length;

        // if adXTimes > 0 ise customer degil ise bos yer
        // default bos icin eklenmesi gereken resimi ekle

        // loop length - gosterilen length = bos gosterilecek reklam suresi

        let file = ad.file;
        let fileType = ad.fileType;
        let id = ad.id;
        if (adXTimes <= 0) {
          file = `${filesDirectory}/hdplayer2.png`;
          fileType = "photo";
          id = "custom";
        }

        const fileName = file.replace(/^.*[\\/]/, "");

        const scene = (
          <HdOrdinaryScenePlugin key={id}>
            <NameAttr name={id}></NameAttr>
            <PlayModeAttr></PlayModeAttr>
            <PlayTimesAttr></PlayTimesAttr>
            <HdFramePlugin key={id}>
              <NameAttr name={fileType}></NameAttr>
              <HeightAttr height={CONTROLLER_HEIGHT}></HeightAttr>
              <WidthAttr width={CONTROLLER_WIDTH}></WidthAttr>
              <AlphaAttr alpha="255"></AlphaAttr>
              {fileType === "video" ? (
                <HdVideoPlugin key={id}>
                  <AudioCodecAttr codec="AAC"></AudioCodecAttr>
                  <AudioCodecIdAttr id="40"></AudioCodecIdAttr>
                  <BitRateAttr bitrate="19884"></BitRateAttr>
                  <CodecIdAttr id="isom"></CodecIdAttr>
                  <FHeightAttr height="1080"></FHeightAttr>
                  <SourceFileTimeAttr time={ad.length}></SourceFileTimeAttr>
                  <FpsAttr fps="30"></FpsAttr>
                  <FWidthAttr width="1920"></FWidthAttr>
                  <VolumeAttr volume="100"></VolumeAttr>
                  <PlayTimesAttr></PlayTimesAttr>
                  <StreamFormatAttr format="MPEG-4"></StreamFormatAttr>
                  <VideoFormatAttr format="AVC"></VideoFormatAttr>
                  <VideoProfileAttr profile="Baseline@L4.1"></VideoProfileAttr>
                  <VideoQualityAttr quality="2"></VideoQualityAttr>
                  <NameAttr name={fileName}></NameAttr>
                  <FileList>
                    <ListItem
                      fileKey={toTitleCase(fileType)}
                      fileName={file}
                    ></ListItem>
                  </FileList>
                </HdVideoPlugin>
              ) : (
                <HdPhotoPlugin key={id}>
                  <HoldTimeAttr time={ad.length * 10}></HoldTimeAttr>
                  <NameAttr name={fileName}></NameAttr>
                  <FileList>
                    <ListItem
                      fileKey={toTitleCase(fileType)}
                      fileName={file}
                    ></ListItem>
                  </FileList>
                </HdPhotoPlugin>
              )}
            </HdFramePlugin>
          </HdOrdinaryScenePlugin>
        );

        scenes.push(scene);
      }
      console.log({ frame });
      videoFrames.push(frame);
    }
    console.log({ videoFrames, advTimeLeft });
    setTotalAdvTimeLeft(advTimeLeft);
    setVideoFrames(videoFrames);
  }

  function adNewAdd() {
    ads.push({
      id: Date.now(),
      file: "C:/Users/alperk/Pictures/hdplayer2.png",
      fileType: "photo",
      length: 1,
      duration: 1,
    });
    setAds([...ads]);
  }

  function updateAd(ad) {
    console.log({ updateAd: ad, ads });
    const adIndex = ads.findIndex((a) => a.id === ad.id);
    console.log({ adIndex });
    ads[adIndex] = ad;
    setAds([...ads]);
  }

  function handleTotalAdvTimeChange(event) {
    setTotalAdvTime(event.target.value);
  }

  function handleFilesDirChange(event) {
    setFilesDirectory(event.target.value);
  }

  function removeAd(ad) {
    console.log({removeAd: ad});
    const newAds = ads.filter(_ad => _ad.id !== ad.id);
    setAds(newAds);
  }

  return (
    <div className="p-4">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>LENGTH</th>
            <th>DURATION</th>
            <th>X-TIMES</th>
            <th>FILE</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {ads.map((ad) => (
            <AdRow ad={ad} updateAd={updateAd} removeAd={(ad) => removeAd(ad)}></AdRow>
          ))}
          <tr>
            <button
              className="bg-blue-700 text-zinc-100 rounded px-3 py-1"
              onClick={adNewAdd}
            >
              + Add
            </button>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td></td>
            <td className="font-bold">
              {totalLength || 0}
              {timeType}
            </td>
            <td className="font-bold">
              {totalDuration || 0}
              {timeType}
            </td>
            <td className="font-bold">{totalTimes || 0} times</td>
          </tr>
        </tfoot>
      </table>

      <div className="mt-6 flex gap-4">
        <button
          className="bg-blue-700 text-zinc-100 px-4 py-2 rounded"
          onClick={calculate}
        >
          Calculate
        </button>

        <button
          className="bg-green-700 text-zinc-100 px-4 py-2 rounded"
          onClick={saveFile}
        >
          Save File
        </button>
      </div>

      <div className="mt-10 flex flex-col gap-4">
        <div>
          Files Directory:{" "}
          <input
            className="font-bold bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 mr-2"
            value={filesDirectory}
            onChange={handleFilesDirChange}
          ></input>
        </div>
        <div>
          Total ADV Time:{" "}
          {/* <span >{`${totalAdvTime}${timeType} (${totalAdvTimeLeft})`}</span> */}
          <input
            value={totalAdvTime}
            className="font-bold bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-16 p-2.5 mr-2"
            onChange={handleTotalAdvTimeChange}
          ></input>
          <span className="font-bold">{timeType}</span>
        </div>
        {/* <div>
          Total ADV Time Left:{' '}
          <span className="font-bold">
            {totalAdvTimeLeft}
            {timeType}
          </span>
        </div> */}
        <div>
          Loop count: <span className="font-bold">{loopXTimes} times</span>
        </div>
      </div>

      <div className="mt-10">
        {videoFrames.map((frame, idx) => (
          <div className="flex gap-4">
            <span className="font-bold w-10">{idx + 1}.</span>
            <span className="flex gap-20">
              {frame.map((f, index) => (
                <div className="w-26">
                  {f > 0
                    ? `${f} (${ads[index]?.id})`
                    : "custom........................"}
                </div>
              ))}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

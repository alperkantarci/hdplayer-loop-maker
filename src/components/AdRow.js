import {
  filesDir,
  imageExtensions,
  timeType,
} from "../constants/app-constants";
import { useEffect, useState } from "react";

function AdRow({ ad, updateAd, removeAd }) {
  const [adLength, setAdLength] = useState(ad.length);
  const [adDuration, setAdDuration] = useState(ad.duration);
  const [adFileType, setAdFileType] = useState();

  useEffect(() => {
    console.log({ lengthChanged: 1 });
    setAdDuration(adLength);

    updateAd({ ...ad, length: Number(adLength), duration: Number(adLength) });
  }, [adLength]);

  const handleAdLengthChange = (event) => {
    setAdLength(event.target.value);
  };

  const handleAdDurationChange = (event) => {
    setAdDuration(event.target.value);
    updateAd({
      ...ad,
      length: Number(adLength),
      duration: Number(event.target.value),
    });
  };

  const handleFileChange = (event) => {
    console.log({files: event.target.files});
    const [file] = event.target.files;
    console.log({file});
    const fileName = event.target.value.split(/(\\|\/)/g).pop();
    console.log({ fileName });
    const isPhoto = imageExtensions.find((ex) => ex === fileName.split(".")[1]);
    const fileType = isPhoto ? "photo" : "video";
    setAdFileType(fileType);
    if (fileType === "photo") {
      setAdLength(1);
      setAdDuration(1);
      updateAd({
        ...ad,
        file: `${filesDir}/${fileName}`,
        fileType,
        length: 1,
        duration: 1,
      });
    } else {
      const video = document.createElement("video");
      video.preload = "metadata";

      video.onloadedmetadata = function() {
        window.URL.revokeObjectURL(video.src);
        const duration = Math.floor(video.duration);
        console.log({duration});
        setAdLength(duration)
      }

      video.src = URL.createObjectURL(file);

      updateAd({ ...ad, file: `${filesDir}/${fileName}`, fileType });
    }
  };

  return (
    <tr key={ad.id}>
      <td>{ad.id}</td>
      <td>
        <input
          type="number"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-20 p-2.5 mr-2"
          value={adLength}
          onChange={handleAdLengthChange}
          min={1}
          // max={adFileType === "photo" ? 1 : null}
        ></input>
        {timeType}
      </td>
      <td>
        <input
          type="number"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-20 p-2.5 mr-2"
          value={adDuration}
          onChange={handleAdDurationChange}
          min={adLength}
          step={adLength}
        ></input>
        {timeType}
      </td>
      <td>{(adDuration / adLength).toFixed(2) || 0}</td>
      {/* <td>
        {ad.tag ? (
          ad.tag
        ) : (
          <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
            <option selected>Choose a tag</option>
            <option value="customer">Customer</option>
            <option value="in-house">In-house</option>
          </select>
        )}
      </td> */}
      <td>
        <input type="file" onChange={handleFileChange}></input>
      </td>
      <td>
        <button className="bg-red-500 text-xs text-zinc-100 px-4 py-2 rounded" onClick={() => removeAd(ad)}>X</button>
      </td>
    </tr>
  );
}

export default AdRow;

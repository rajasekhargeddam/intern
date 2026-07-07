import {
  Root,
  Trigger,
  Portal,
  Overlay,
  Content,
  Title,
  Close,
} from "@radix-ui/react-dialog";
import { useState } from "react";

import { POSTS_API } from "../constants/api";

function CreatePostForm() {
  const [content, setContent] = useState("");
  const [imgUrl1, setImgUrl1] = useState("");
  const [imgUrl2, setImgUrl2] = useState("");
  const [imgUrl3, setImgUrl3] = useState("");
  const [imgUrl4, setImgUrl4] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [isPosting, setIsPosting] = useState(false);

  const onClickPostBtn = async () => {
    setIsPosting(true);
    setErrMsg("");

    if (!content) {
      setErrMsg("Can't post eamty content");
      return;
    }

    const images = [];

    if (imgUrl1) images.push(imgUrl1);
    if (imgUrl2) images.push(imgUrl2);
    if (imgUrl3) images.push(imgUrl3);
    if (imgUrl4) images.push(imgUrl4);

    const postData = {
      content,
      images: images,
    };

    try {
      const response = await fetch(POSTS_API, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response?.status}`);
      }

      const data = await response.json();
      alert(data.message);
      console.log(data);
      setContent("");
      setImgUrl1("");
      setImgUrl2("");
      setImgUrl3("");
      setImgUrl4("");
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An error occurred during signup";
      setErrMsg(errorMessage);
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <Root>
      <Trigger asChild>
        <button className="flex gap-1 border rounded-md py-1 px-4 hover:shadow-xl transition-all duration-300 cursor-pointer">
          + <span className="hidden sm:block">Create Post</span>
        </button>
      </Trigger>

      <Portal>
        <Overlay className="fixed inset-0 bg-black/50 z-40" />

        <Content className="fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-white p-5 shadow-2xl sm:p-7">
          <div className="flex justify-end">
            <Close asChild>
              <button className="bg-slate-100 text-slate-700 p-2 rounded-2xl hover:bg-slate-200 transition-colors duration-200">
                X
              </button>
            </Close>
          </div>
          <Title className="text-center text-xl font-semibold text-slate-900 mb-4">
            Create Your Post
          </Title>

          <textarea
            rows={5}
            className="w-full rounded-3xl border border-slate-300 bg-slate-50 p-4 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
            placeholder="Write something..."
            value={content}
            onChange={(event) => {
              setContent(event.target.value);
            }}
          />

          <div className="mt-4 flex flex-col gap-3">
            <label className="text-sm font-medium text-slate-700">
              Enter image URLs
            </label>
            <input
              type="text"
              className="w-full rounded-3xl border border-slate-300 bg-slate-50 py-3 px-4 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
              placeholder="Enter Image URL 1"
              value={imgUrl1}
              onChange={(event) => {
                setImgUrl1(event.target.value);
              }}
            />
            <input
              type="text"
              className="w-full rounded-3xl border border-slate-300 bg-slate-50 py-3 px-4 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
              placeholder="Enter Image URL 2"
              value={imgUrl2}
              onChange={(event) => {
                setImgUrl2(event.target.value);
              }}
            />
            <input
              type="text"
              className="w-full rounded-3xl border border-slate-300 bg-slate-50 py-3 px-4 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
              placeholder="Enter Image URL 3"
              value={imgUrl3}
              onChange={(event) => {
                setImgUrl3(event.target.value);
              }}
            />
            <input
              type="text"
              className="w-full rounded-3xl border border-slate-300 bg-slate-50 py-3 px-4 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
              placeholder="Enter Image URL 4"
              value={imgUrl4}
              onChange={(event) => {
                setImgUrl4(event.target.value);
              }}
            />
          </div>

          {errMsg && <p className="mt-3 text-sm text-red-500">{errMsg}</p>}

          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:justify-end">
            <button
              className="w-full rounded-lg px-3 bg-blue-600 py-3 text-sm font-semibold text-white transition cursor-pointer hover:bg-blue-700 sm:w-auto"
              type="button"
              onClick={onClickPostBtn}
              disabled={isPosting}
            >
              POST
            </button>
          </div>
        </Content>
      </Portal>
    </Root>
  );
}

export default CreatePostForm;

import { Switch } from "@headlessui/react";
import React, { useState } from "react";

const CreateNews = () => {
  const [enabled, setEnabled] = useState(false);

  return (
    <>
      <div className="">
        <h1 className="text-center text-5xl font-bold">Create News</h1>
        <form action="" className="">
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Post Title</span>
            </div>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs"
            />
          </label>

          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">News Category</span>
            </div>
            <select className="select select-bordered w-full max-w-xs">
              <option disabled selected>
                Select news category{" "}
              </option>
              <option>Tech</option>
              <option>Anime</option>
              <option value="">Polithics</option>
            </select>
          </label>

          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Choose Cover Image</span>
            </div>
            <input
              type="file"
              className="file-input file-input-bordered w-full max-w-xs"
            />
          </label>

          <label className="form-control">
            <div className="label">
              <span className="label-text">Your content</span>
            </div>
            <textarea
              className="textarea textarea-bordered textarea-lg h-24 w-full"
              placeholder="Bio"
              //   rows={4}
              minLength={5}
              maxLength={500}
            />
          </label>
          <div className="form-control w-52">
            <label className="cursor-pointer label">
              <span className="label-text">Premium Post</span>
              <Switch
                checked={enabled}
                onChange={setEnabled}
                className={`${
                  enabled ? "bg-blue-600" : "bg-gray-200"
                } relative inline-flex h-6 w-11 items-center rounded-full`}
              >
                <span
                  className={`${
                    enabled ? "translate-x-6" : "translate-x-1"
                  } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                />
              </Switch>
            </label>
          </div>

          <button type="submit" className="btn btn-primary mt-5">
            Post
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateNews;

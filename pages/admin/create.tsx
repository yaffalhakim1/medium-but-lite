import { BASE_URL } from "@/config/api";
import { INewsElement } from "@/types/news-types";
import { Switch } from "@headlessui/react";
import axios from "axios";
import { SyntheticEvent, useState } from "react";
import { toast } from "sonner";
import Select from "react-select";
import { useRouter } from "next/router";

const CreateNews = () => {
  const [enabled, setEnabled] = useState(false);
  const router = useRouter();
  const [image, setImage] = useState<File | null>(null);
  const [, setImageUrl] = useState<string>("");
  const [, setLoading] = useState(false);

  const [formPost, setFormPost] = useState({
    title: "",
    content: "",
    isPremium: enabled,
    img: "",
    category: [],
    createdAt: new Date(),
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormPost((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: any) => {
    const selectedValue = value.map((item: any) => item.value);
    setFormPost((prev) => ({ ...prev, category: selectedValue }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedImages = e.target.files[0];
      setImage(selectedImages);
    }
  };

  async function handleImageUpload() {
    setLoading(true);
    toast.loading("Uploading image...");
    const data = new FormData();
    if (!image) {
      toast.error("No image selected");
      return;
    }
    data.append("file", image!);
    data.append("upload_preset", "ruvcqm7j");
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/dywbf3czv/image/upload`,
      {
        method: "POST",
        body: data,
      }
    );

    const file = await response.json();
    setImageUrl(file.secure_url);
    setFormPost((prev) => ({ ...prev, img: file.secure_url }));
    toast.success("Image uploaded successfully");
    setLoading(false);
  }

  async function handlePostSubmit(e: SyntheticEvent) {
    e.preventDefault();
    try {
      const res = await axios.post<INewsElement>(
        `${BASE_URL}/news`,
        {
          title: formPost.title,
          content: formPost.content,
          isPremium: formPost.isPremium,
          category: formPost.category as string[],
          created_at: formPost.createdAt,
          img: formPost.img,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(res.data, "from post create");
      toast.success("News created successfully");
      return router.push("/admin");
    } catch (error) {
      toast.error("News created failed");
    }
  }

  return (
    <>
      <div className="">
        <h1 className="text-center text-5xl font-bold mt-10">Create News</h1>
        <form onSubmit={handlePostSubmit} className="px-7">
          <label className=" w-full max-w-xs">
            <div className="label">
              <span className="label-text">Post Title</span>
            </div>
            <input
              type="text"
              name="title"
              placeholder="Your title here"
              className="input input-bordered w-full "
              onChange={handleInputChange}
            />
          </label>

          <label className="form-control w-full ">
            <div className="label">
              <span className="label-text">News Category</span>
            </div>

            <Select
              isMulti
              name="category"
              options={[
                { value: "Tech", label: "Tech" },
                { value: "Anime", label: "Anime" },
                { value: "Polithics", label: "Polithics" },
              ]}
              className="basic-multi-select"
              classNamePrefix="select"
              onChange={handleSelectChange}
            />
          </label>

          <label className="form-control">
            <div className="label">
              <span className="label-text">Your content</span>
            </div>
            <input
              className="textarea textarea-bordered textarea-lg h-24 w-full"
              placeholder="Content here"
              name="content"
              minLength={5}
              maxLength={500}
              onChange={handleInputChange}
            />
          </label>
          <label className="form-control w-full ">
            <div className="label">
              <span className="label-text">Choose Cover Image</span>
            </div>
            <input
              type="file"
              className="file-input file-input-bordered w-full "
              placeholder="Choose file"
              name="img"
              onChange={handleImageChange}
            />
            <button
              type="button"
              onClick={handleImageUpload}
              className="btn btn-primary"
            >
              Save Image
            </button>
          </label>
          <div className="form-control w-52">
            <label className="cursor-pointer label">
              <span className="label-text">Premium Post</span>
              <Switch
                name="isPremium"
                checked={enabled}
                onChange={() => setEnabled(true)}
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

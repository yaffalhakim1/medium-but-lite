/* eslint-disable @next/next/no-img-element */
import { BASE_URL } from "@/config/api";
import { INewsElement } from "@/types/news-types";
import { Switch } from "@headlessui/react";
import axios from "axios";
import { Fragment, SyntheticEvent, useState } from "react";
import { toast } from "sonner";
import Select from "react-select";
import { useRouter } from "next/router";
import { validateTitle, validateContent } from "@/lib/helper/validators";

// Cloudinary credentials — override locally via env (see .env.example).
const CLOUDINARY_CLOUD_NAME =
  process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "dywbf3czv";
const CLOUDINARY_UPLOAD_PRESET =
  process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "ruvcqm7j";

interface INews {
  id: number;
  isPremium: boolean;
  title: string;
  content: string;
  desc: string;
  img: string;
  created_at: Date;
  updated_at: Date;
  category: string[];
  like: number;
}

const PostForm = (data: { data?: INews }) => {
  const product = data.data;
  const [enabled, setEnabled] = useState(false);
  const router = useRouter();
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [, setLoading] = useState(false);
  const [validationTitleError, setValidationTitleError] = useState<
    string | null
  >(null);
  const [validationContentError, setvalidationContentError] = useState<
    string | null
  >(null);

  const [formPost, setFormPost] = useState({
    title: "",
    content: "",
    isPremium: enabled,
    img: imageUrl,
    category: [],
    createdAt: new Date(),
    likes: [],
  });

  const [editedPost, setEditedPost] = useState({
    title: product?.title,
    content: product?.desc,
    isPremium: product?.isPremium,
    img: product?.img,
    category: product?.category,
    createdAt: new Date(),
  });

  const handleSwitchChange = () => {
    setEnabled(!enabled);
    if (product?.id) {
      setEditedPost((prev) => ({ ...prev, isPremium: !prev.isPremium }));
    }
    setFormPost((prev) => ({ ...prev, isPremium: !prev.isPremium }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (product?.id) {
      setEditedPost((prev) => ({ ...prev, [name]: value }));
    }
    setFormPost((prev) => ({ ...prev, [name]: value }));

    if (name === "title") {
      setValidationTitleError(validateTitle(value));
    }

    if (name === "content") {
      setvalidationContentError(validateContent(value));
    }
  };

  const handleSelectChange = (value: any) => {
    if (value.length > 2) {
      toast.error("Maximum 2 categories per post");
      return;
    }
    const selectedValue = value.map((item: any) => item.value);
    if (product?.id) {
      setEditedPost((prev) => ({ ...prev, category: selectedValue }));
    }
    setFormPost((prev) => ({ ...prev, category: selectedValue }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Assignment spec: exactly one image at 1920x1080 resolution.
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(url);
      if (img.width !== 1920 || img.height !== 1080) {
        toast.error("Image must be 1920x1080 (please resize and try again)");
        e.target.value = "";
      } else {
        setImage(file);
      }
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      toast.error("Could not read the selected image");
      e.target.value = "";
    };
    img.src = url;
  };

  async function handleImageUpload() {
    setLoading(true);
    toast.loading("Uploading image...");
    const data = new FormData();
    if (!image) {
      toast.error("No image selected");
      setLoading(false);
      return;
    }
    data.append("file", image!);
    data.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: data,
      }
    );

    const file = await response.json();
    if (!response.ok || !file.secure_url) {
      toast.error("Image upload failed");
      setLoading(false);
      return;
    }
    setImageUrl(file.secure_url);
    setFormPost((prev) => ({ ...prev, img: file.secure_url }));
    setEditedPost((prev) => ({ ...prev, img: file.secure_url }));
    toast.success("Image uploaded successfully");
    setLoading(false);
  }

  async function handlePostSubmit(e: SyntheticEvent) {
    e.preventDefault();

    try {
      // Assignment spec: max one premium post at a time.
      if (formPost.isPremium || editedPost.isPremium) {
        const existing = await fetch(`${BASE_URL}/news?isPremium=true`);
        const premiumPosts = await existing.json();
        const otherPremium = (Array.isArray(premiumPosts) ? premiumPosts : [])
          .filter((n: INewsElement) => n.id !== data.data?.id);
        if (otherPremium.length > 0) {
          toast.error(
            "Only one premium post is allowed — deactivate the existing one first"
          );
          return;
        }
      }

      if (data.data?.id) {
        await axios.patch<INewsElement>(
          `${BASE_URL}/news/${data.data?.id}`,
          {
            title: editedPost.title,
            content: editedPost.content,
            isPremium: editedPost.isPremium,
            category: editedPost.category as string[],
            created_at: editedPost.createdAt,
            img: editedPost.img,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        toast.success("News updated successfully");
        return router.push("/admin");
      } else {
        await axios.post<INewsElement>(
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
        toast.success("News created successfully");
        return router.push("/admin");
      }
    } catch (error) {
      toast.error("News created failed");
    }
  }

  return (
    <>
      <div className="">
        <h1 className="text-center text-5xl font-bold mt-10">
          {product?.id ? "Edit" : "Create"} News
        </h1>
        <form onSubmit={handlePostSubmit} className="px-7">
          <label className=" w-full max-w-xs">
            <div className="label">
              <span className="label-text">Post Title</span>
            </div>
            <input
              type="text"
              name="title"
              placeholder="Your title here"
              className={`input input-bordered w-full ${
                validationTitleError && "input-error "
              }`}
              defaultValue={product?.title}
              onChange={handleInputChange}
            />
            {validationTitleError && (
              <p className="text-start mt-2 text-sm text-red-500 border-red-400">
                {validationTitleError}
              </p>
            )}
          </label>

          <label className="form-control w-full ">
            <div className="label">
              <span className="label-text">News Category</span>
            </div>

            <Select
              isMulti
              required
              name="category"
              isClearable={true}
              options={[
                { value: "Tech", label: "Tech" },
                { value: "Anime", label: "Anime" },
                { value: "Politics", label: "Politics" },
              ]}
              defaultValue={product?.category?.map((item) => ({
                value: item,
                label: item,
              }))}
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
              // className="textarea textarea-bordered textarea-lg h-24 w-full"
              className={`textarea textarea-bordered textarea-lg h-24 w-full ${
                validationContentError && "input-error"
              }`}
              placeholder="Content here"
              name="content"
              minLength={5}
              maxLength={500}
              defaultValue={product?.content}
              onChange={handleInputChange}
            />
            {validationContentError && (
              <p className="text-start mt-2 text-sm text-red-500 border-red-400">
                {validationContentError}
              </p>
            )}
          </label>

          <img src={imageUrl} alt="" width="120px" className="w-65 mt-2" />

          <label className="form-control w-full ">
            <div className="label">
              <span className="label-text">Choose Cover Image</span>
            </div>
            <div className="lg:flex items-center lg:space-x-2">
              <input
                type="file"
                className="file-input file-input-bordered w-full "
                placeholder="Choose image"
                name="img"
                onChange={handleImageChange}
              />
              <button
                type="button"
                onClick={handleImageUpload}
                className="btn btn-neutral w-full mt-2 md:mt-0 md:w-auto no-animation"
              >
                Upload Image
              </button>
            </div>
          </label>
          <img src={product?.img} alt="" />
          <div className="form-control w-52">
            <label className="cursor-pointer label">
              <span className="label-text">Premium Post</span>
              <Switch
                name="isPremium"
                defaultChecked={product?.isPremium}
                onChange={handleSwitchChange}
              >
                {({ checked }) => (
                  <button
                    className={`${
                      checked ? "bg-blue-600" : "bg-gray-200"
                    } relative inline-flex h-6 w-11 items-center rounded-full`}
                  >
                    <span
                      className={`${
                        checked ? "translate-x-6" : "translate-x-1"
                      } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                    />
                  </button>
                )}
              </Switch>
            </label>
          </div>

          <button
            type="submit"
            className="btn btn-neutral mt-5 w-full no-animation"
          >
            Post News
          </button>
        </form>
      </div>
    </>
  );
};

export default PostForm;

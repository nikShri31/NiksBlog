import React, { useCallback } from 'react'
import {  useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "../index";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PostForm = ({ post }) => {

  // SYNTAX  const { } = useForm( { defaultValues:{ }  }); **{watch,control} use form {} m {} deta h 

  const { register, handleSubmit, setValue, getValues, control, watch } = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.$id || "",
      content: post?.content || "",
      status: post?.status || "active",
    },
  });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData)

  const submit = async (data) => {
    // ****remember to take post value as props in postForm function.****
    // agar hmare pass koi post h toh........
    if (post) {
      const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;

      // kyuki nyi file upload hui h toh purani delete krni hogi
      if (file) {
        appwriteService.deleteFile(post.featuredImage);
      }
      // FILE UPLOAD HO GYI AB POST BHI TOH UPDATE KRNI H SO... 
      // ********  updatePost( slug, { ...data , featuredImage})**********************
      const dbPost = await appwriteService.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined
      });
      // AB NAVIGATE KRA DENGE USER KO
      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    }
    // AGAR KOI POST NHI H TOH CREATE KRNI HOGI phle file upload krenge LAST m NAVIGATE KRWA DENGE
    else {
      const file = await appwriteService.uploadFile(data.image[0]);
      if (file) {
        const fileId = file.$id;
        data.featuredImage = fileId              // ******createPost ({...data , userId:})
        const dbPost = await appwriteService.createPost({ ...data, userId: userData.$id });

        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      }
    }

  }
  // *** useCallback will return a memoized version of the entire callback function {slugTransform()}
  //       that only changes if one of the inputs has changed.

  // ************useCallback(()=>{},[])
  const slugTransform = useCallback((value) => {
    //console.log(value);
    if (value && typeof value === 'string')

      return value
        .trim()
        .toLowerCase()
        .replace(/^[a-zA-Z\d\s]+/g, '-')             // *****REGULAR EXPRESSIONS
        .replace(/\s/g, '-')
    return "";
  }, [])

  // SYNTAX --> *****watch ((value,{name})=>{ if(){ setValue()} } )** watch ek function h RHF ka
  // WATCH() --> Watch and Subscribe to the entire form update/change based on onChange and re-render at the useForm.

  React.useEffect(() => {
    const Subscription = watch((value, { name }) => {
      if (name === 'title') {
        setValue('slug', slugTransform(value.title, { shouldValidate: true }))
      }
    })
    return () => Subscription.unsubscribe()   // cleanup function
  }
    , [watch, slugTransform, setValue])

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      <div className="w-2/3 px-2">
        <Input
          lable="Title"
          placeholder="Title"
          className="mb-4"
          {...register("title", { required: true, })}       // {...register( value,{required : , ...})}
        />
        <Input 
        lable="slug"
          placeholder="slug"
          className="mb-4"
          {...register("slug", { required: true, })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.target.value), { shouldValidate: true })
          }}
        />
        <RTE lable="Content:" name="content" control={control} defaultValues={getValues("content")} />
      </div>
      <div className="w-1/3 px-2">
        <Input
          label="Featured Image :"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
        />
        {
          post && (
          <div className="w-full mb-4">
            <img
              src={appwriteService.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="rounded-lg" />
          </div>
        )}
        <Select
          options={['active', 'inactive']}
          lable='status'
          className="mb-4"
          {...register("status", { required: true })}
        />

        <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
          {post ? "Update" : "Submit"}
        </Button>

      </div>
    </form>
  );
};
// *** Button post pr depend krega ***

export default PostForm;
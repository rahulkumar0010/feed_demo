"use client";
import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Image from "next/image";

const validationSchema = Yup.object().shape({
  content: Yup.string()
    .required("Post content is required")
    .max(500, "Content is too long"),
  image: Yup.mixed().nullable(),
});

export default function PostForm({ onSubmit }) {
  const [preview, setPreview] = useState(null);

  const handleImageChange = (event, setFieldValue) => {
    const file = event.currentTarget.files[0];
    setFieldValue("image", file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-4">
      <Formik
        initialValues={{ content: "", image: null }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          const formData = new FormData();
          formData.append("content", values.content);
          if (values.image) formData.append("image", values.image);

          onSubmit(formData);
          resetForm();
          setPreview(null);
        }}
      >
        {({ setFieldValue }) => (
          <Form>
            <div className="mb-2">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageChange(e, setFieldValue)}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
            </div>

            {preview && (
              <div className="relative w-full h-64 mb-2">
                <Image
                  src={preview}
                  alt="Preview"
                  fill
                  className="object-cover rounded-md"
                />
              </div>
            )}
            <Field
              as="textarea"
              name="content"
              placeholder="What's on your mind?"
              className="w-full border rounded p-2 mb-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
              rows={4}
            />
            <ErrorMessage
              name="content"
              component="div"
              className="text-red-500 text-sm mb-2"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            >
              Post
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

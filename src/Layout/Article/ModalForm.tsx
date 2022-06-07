import { Editor } from "@tinymce/tinymce-react";
import { useAppSelector } from "app/hooks";
import { createArticle, selectCreateLoading } from "features/article/articleSlice";
import { FastField, FieldArray, Formik } from "formik";
import { IconLoading } from "Layout";
import InputField from "Layout/Form/InputField";
import { ArticleModal } from "models/article.model";
import React, { useRef } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useAppDispatch } from "../../app/hooks";
import ArticleSchema from "./ArticleSchema";
const initialValues: ArticleModal = {
  title: "",
  description: "",
  tagList: [],
};
export interface ModalFormProps {
  show: boolean;
  callbackSetShow: any;
}
export default function ModalForm({ show, callbackSetShow }: ModalFormProps) {
  const editorRef = useRef<any>(null);
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectCreateLoading);
  return (
    <Modal show={show} onHide={() => callbackSetShow(false)} dialogClassName="modal-xl">
      <Modal.Header closeButton>
        <Modal.Title>Create a Article</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={initialValues}
          validationSchema={ArticleSchema}
          onSubmit={(values) => {
            dispatch(createArticle({ ...values, body: editorRef.current.getContent() }));
          }}
        >
          {({ handleSubmit, values, errors }) => {
            return (
              <Form className="needs-validation">
                <FastField
                  name="title"
                  component={InputField}
                  type="text"
                  placeholder="Title"
                  icon={<i className="fa fa-book-open"></i>}
                />
                <FastField
                  name="description"
                  component={InputField}
                  type="text"
                  placeholder="Description"
                  icon={<i className="fa fa-book-open"></i>}
                />
                <Form.Group className="form-bordered">
                  <FieldArray
                    name="tagList"
                    render={(arrayHelpers: any) => (
                      <div className="tags-input">
                        <div className="tags-content">
                          {values.tagList.map((tag, index) => (
                            <div key={index} className="tags-item" onClick={() => arrayHelpers.remove(index)}>
                              {tag}
                            </div>
                          ))}
                          <input
                            type="text"
                            className="tags-control"
                            onKeyDown={(e: any) => {
                              if (e.keyCode === 13) {
                                arrayHelpers.push(e.target.value);
                                e.target.value = "";
                              }
                            }}
                            placeholder="Enter tag"
                          />
                        </div>
                      </div>
                    )}
                  />
                  <Form.Text className="text-danger">{errors.tagList}</Form.Text>
                </Form.Group>
                <Editor
                  apiKey="nqbiutl3i83bkdoklqoybhc2v3c6wyy9kyj5nx24n96puhel"
                  onInit={(evt, editor) => (editorRef.current = editor)}
                  initialValue="<p>This is the initial content of the editor.</p>"
                  init={{
                    height: 500,
                    menubar: false,
                    plugins: [
                      "advlist",
                      "autolink",
                      "lists",
                      "link",
                      "image",
                      "charmap",
                      "preview",
                      "anchor",
                      "searchreplace",
                      "visualblocks",
                      "code",
                      "fullscreen",
                      "insertdatetime",
                      "media",
                      "table",
                      "code",
                      "help",
                      "wordcount",
                    ],
                    toolbar: `undo redo | blocks | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help",
                content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }`,
                  }}
                />
                <Modal.Footer>
                  <Button variant="secondary" onClick={() => callbackSetShow(false)}>
                    Close
                  </Button>
                  <Button variant="primary" onClick={() => handleSubmit()} disabled={loading}>
                    Create {loading && <IconLoading />}
                  </Button>
                </Modal.Footer>
              </Form>
            );
          }}
        </Formik>
      </Modal.Body>
    </Modal>
  );
}

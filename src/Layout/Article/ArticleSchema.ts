import * as Yup from "yup";
export default Yup.object({
  title: Yup.string().required("Title can not blank!"),
  description: Yup.string().required("Description can not blank!"),
  tags: Yup.array().min(1, "Tags can not blank!"),
});

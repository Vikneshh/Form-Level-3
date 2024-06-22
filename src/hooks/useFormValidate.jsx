import { useState } from "react";

const useFormValidate = (initial) => {
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setValues((prevValues) => ({
        ...prevValues,
        [name]: {
          ...prevValues[name],
          [value]: checked,
        },
      }));
    } else if (name.includes(".")) {
      const [section, field] = name.split(".");
      setValues((prevValues) => ({
        ...prevValues,
        [section]: {
          ...prevValues[section],
          [field]: value,
        },
      }));
    } else {
      setValues((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));
    }
  };

  const validate = (fields, additionalQuestions) => {
    const newErrors = {};

    if (fields.name.trim() === "") newErrors.name = "Name is required.";
    if (!fields.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      newErrors.email = "Email is invalid.";
    if (fields.surveyTopic.trim() === "")
      newErrors.surveyTopic = "Survey Topic is required.";

    if (fields.surveyTopic === "Technology") {
      if (fields.technology.programmingLanguage.trim() === "")
        newErrors.programmingLanguage =
          "Favorite Programming Language is required.";
      if (fields.technology.yearsOfExperience === "")
        newErrors.yearsOfExperience = "Years of Experience is required.";
    }

    if (fields.surveyTopic === "Health") {
      if (fields.health.exerciseFrequency.trim() === "")
        newErrors.exerciseFrequency = "Exercise Frequency is required.";
      if (fields.health.dietPreference.trim() === "")
        newErrors.dietPreference = "Diet Preference is required.";
    }

    if (fields.surveyTopic === "Education") {
      if (fields.education.highestQualification.trim() === "")
        newErrors.highestQualification = "Highest Qualification is required.";
      if (fields.education.fieldOfStudy.trim() === "")
        newErrors.fieldOfStudy = "Field of Study is required.";
    }

    additionalQuestions.forEach((question) => {
      if (
        !fields.additionalQuestions[question.id] ||
        fields.additionalQuestions[question.id]?.trim() === ""
      )
        newErrors[question.id] = `${question.question} is required.`;
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const resetForm = () => {
    setValues(initial);
    setErrors({});
  };

  return {
    values,
    errors,
    handleChange,
    validate,
    resetForm,
  };
};

export default useFormValidate;

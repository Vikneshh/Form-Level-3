import React, { useState, useEffect } from "react";
import axios from "axios";
import useFormValidate from "./hooks/useFormValidate";

const App = () => {
  const [isEditing, setIsEditing] = useState(true);
  const [topicQuestions, setTopicQuestions] = useState([]);
  const { values, errors, handleChange, validate, resetForm } = useFormValidate(
    {
      name: "",
      email: "",
      surveyTopic: "",
      technology: {
        programmingLanguage: "",
        yearsOfExperience: "",
      },
      health: {
        exerciseFrequency: "",
        dietPreference: "",
      },
      education: {
        highestQualification: "",
        fieldOfStudy: "",
      },
      additionalQuestions: {},
      feedback: "",
    }
  );

  useEffect(() => {
    if (values.surveyTopic) {
      fetchTopicQuestions(values.surveyTopic);
    }
  }, [values.surveyTopic]);

  // API datas are fetched from mockapi.io where I generated an endpoint for my own JSON Data.

  const fetchTopicQuestions = async (topic) => {
    let url = "";
    if (topic === "Technology") {
      url =
        "https://6676f64e145714a1bd7356b2.mockapi.io/surdeep-singh-assignment/technology";
    } else if (topic === "Health") {
      url =
        "https://6676f64e145714a1bd7356b2.mockapi.io/surdeep-singh-assignment/health";
    } else if (topic === "Education") {
      url =
        "https://6676fd30145714a1bd736a3f.mockapi.io/surdeep-singh-assignment/education";
    }
    try {
      const response = await axios.get(url);
      setTopicQuestions(response.data);
    } catch (error) {
      console.error("Error fetching topic questions", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate(values, topicQuestions);
    if (isValid) {
      setIsEditing(false);
    }
  };

  const handleReset = () => {
    resetForm();
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  return (
    <div className="w-50 mx-auto">
      <h1 className="text-center m-3">
        Survey Form <span className="h3">(API Integrated)</span>
      </h1>
      {isEditing ? (
        <form
          className="bg-body-secondary p-4 rounded-4"
          onSubmit={handleSubmit}
        >
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Full Name:
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={values.name}
              onChange={handleChange}
            />
            {errors.name && (
              <small className="text-danger">{errors.name}</small>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address:
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={values.email}
              onChange={handleChange}
            />
            {errors.email && (
              <small className="text-danger">{errors.email}</small>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="surveyTopic" className="form-label">
              Survey Topic:
            </label>
            <select
              className="form-control"
              id="surveyTopic"
              name="surveyTopic"
              value={values.surveyTopic}
              onChange={handleChange}
            >
              <option value="">Select Topic</option>
              <option value="Technology">Technology</option>
              <option value="Health">Health</option>
              <option value="Education">Education</option>
            </select>
            {errors.surveyTopic && (
              <small className="text-danger">{errors.surveyTopic}</small>
            )}
          </div>

          {values.surveyTopic === "Technology" && (
            <div>
              <div className="mb-3">
                <label
                  htmlFor="technology.programmingLanguage"
                  className="form-label"
                >
                  Favorite Programming Language:
                </label>
                <select
                  className="form-control"
                  id="programmingLanguage"
                  name="technology.programmingLanguage"
                  value={values.technology.programmingLanguage}
                  onChange={handleChange}
                >
                  <option value="">Select Language</option>
                  <option value="JavaScript">JavaScript</option>
                  <option value="Python">Python</option>
                  <option value="Java">Java</option>
                  <option value="C#">C#</option>
                </select>
                {errors.programmingLanguage && (
                  <small className="text-danger">
                    {errors.programmingLanguage}
                  </small>
                )}
              </div>

              <div className="mb-3">
                <label
                  htmlFor="technology.yearsOfExperience"
                  className="form-label"
                >
                  Years of Experience:
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="yearsOfExperience"
                  name="technology.yearsOfExperience"
                  value={values.technology.yearsOfExperience}
                  onChange={handleChange}
                  min="0"
                />
                {errors.yearsOfExperience && (
                  <small className="text-danger">
                    {errors.yearsOfExperience}
                  </small>
                )}
              </div>
            </div>
          )}

          {values.surveyTopic === "Health" && (
            <div>
              <div className="mb-3">
                <label
                  htmlFor="health.exerciseFrequency"
                  className="form-label"
                >
                  Exercise Frequency:
                </label>
                <select
                  className="form-control"
                  id="exerciseFrequency"
                  name="health.exerciseFrequency"
                  value={values.health.exerciseFrequency}
                  onChange={handleChange}
                >
                  <option value="">Select Frequency</option>
                  <option value="Daily">Daily</option>
                  <option value="Weekly">Weekly</option>
                  <option value="Monthly">Monthly</option>
                  <option value="Rarely">Rarely</option>
                </select>
                {errors.exerciseFrequency && (
                  <small className="text-danger">
                    {errors.exerciseFrequency}
                  </small>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="health.dietPreference" className="form-label">
                  Diet Preference:
                </label>
                <select
                  className="form-control"
                  id="dietPreference"
                  name="health.dietPreference"
                  value={values.health.dietPreference}
                  onChange={handleChange}
                >
                  <option value="">Select Diet</option>
                  <option value="Vegetarian">Vegetarian</option>
                  <option value="Vegan">Vegan</option>
                  <option value="Non-Vegetarian">Non-Vegetarian</option>
                </select>
                {errors.dietPreference && (
                  <small className="text-danger">{errors.dietPreference}</small>
                )}
              </div>
            </div>
          )}

          {values.surveyTopic === "Education" && (
            <div>
              <div className="mb-3">
                <label
                  htmlFor="education.highestQualification"
                  className="form-label"
                >
                  Highest Qualification:
                </label>
                <select
                  className="form-control"
                  id="highestQualification"
                  name="education.highestQualification"
                  value={values.education.highestQualification}
                  onChange={handleChange}
                >
                  <option value="">Select Qualification</option>
                  <option value="High School">High School</option>
                  <option value="Bachelor's">Bachelor's</option>
                  <option value="Master's">Master's</option>
                  <option value="PhD">PhD</option>
                </select>
                {errors.highestQualification && (
                  <small className="text-danger">
                    {errors.highestQualification}
                  </small>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="education.fieldOfStudy" className="form-label">
                  Field of Study:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="fieldOfStudy"
                  name="education.fieldOfStudy"
                  value={values.education.fieldOfStudy}
                  onChange={handleChange}
                />
                {errors.fieldOfStudy && (
                  <small className="text-danger">{errors.fieldOfStudy}</small>
                )}
              </div>
            </div>
          )}

          {topicQuestions.map((question) => (
            <div className="mb-3" key={question.id}>
              <label
                htmlFor={`additionalQuestions.${question.id}`}
                className="form-label"
              >
                {question.question}
              </label>
              {question.type === "dropdown" ? (
                <select
                  className="form-control"
                  id={`additionalQuestions.${question.id}`}
                  name={`additionalQuestions.${question.id}`}
                  value={values.additionalQuestions[question.id] || ""}
                  onChange={handleChange}
                >
                  <option value="">Select an option</option>
                  {question.options.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type="text"
                  className="form-control"
                  id={`additionalQuestions.${question.id}`}
                  name={`additionalQuestions.${question.id}`}
                  value={values.additionalQuestions[question.id] || ""}
                  onChange={handleChange}
                />
              )}
              {errors[question.id] && (
                <small className="text-danger">{errors[question.id]}</small>
              )}
            </div>
          ))}

          <div className="mb-3">
            <label htmlFor="feedback" className="form-label">
              Feedback:
            </label>
            <textarea
              className="form-control"
              id="feedback"
              name="feedback"
              value={values.feedback}
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="text-center">
            <button type="submit" className="btn btn-primary w-50">
              Submit
            </button>

            <button
              type="reset"
              className="btn btn-danger float-end"
              onSubmit={handleReset}
            >
              Reset
            </button>
          </div>
        </form>
      ) : (
        <div>
          <div className="bg-body-secondary p-4 rounded-4">
            <h3 className="text-center text-decoration-underline link-underline-danger">
              Summary
            </h3>
            <p>
              <strong>Name:</strong> {values.name}
            </p>
            <p>
              <strong>Email:</strong> {values.email}
            </p>
            <p>
              <strong>Survey Topic:</strong> {values.surveyTopic}
            </p>

            {values.surveyTopic === "Technology" && (
              <div>
                <p>
                  <strong>Favorite Programming Language:</strong>{" "}
                  {values.technology.programmingLanguage}
                </p>
                <p>
                  <strong>Years of Experience:</strong>{" "}
                  {values.technology.yearsOfExperience}
                </p>
              </div>
            )}

            {values.surveyTopic === "Health" && (
              <div>
                <p>
                  <strong>Exercise Frequency:</strong>{" "}
                  {values.health.exerciseFrequency}
                </p>
                <p>
                  <strong>Diet Preference:</strong>{" "}
                  {values.health.dietPreference}
                </p>
              </div>
            )}

            {values.surveyTopic === "Education" && (
              <div>
                <p>
                  <strong>Highest Qualification:</strong>{" "}
                  {values.education.highestQualification}
                </p>
                <p>
                  <strong>Field of Study:</strong>{" "}
                  {values.education.fieldOfStudy}
                </p>
              </div>
            )}

            {topicQuestions.map((question) => (
              <div key={question.id}>
                <p>
                  <strong>{question.question}:</strong>{" "}
                  {values.additionalQuestions[question.id]}
                </p>
              </div>
            ))}

            <p>
              <strong>Feedback:</strong> {values.feedback}
            </p>
          </div>
          <button className="btn btn-secondary mt-3" onClick={handleEdit}>
            Edit
          </button>
        </div>
      )}
    </div>
  );
};

export default App;

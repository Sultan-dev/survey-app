import { useState } from "react";
import axios from "axios";
import { toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Home() {
  const [isLoading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [feedback, setFeedback] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(
    new Date().toISOString().split("T")[0]
  );

  const [error, setError] = useState("");
  // Separate error states for each field
  const [nameError, setNameError] = useState("");
  const [jobTitleError, setJobTitleError] = useState("");
  const [feedbackError, setFeedbackError] = useState("");
  const [dateOfBirthError, setDateOfBirthError] = useState("");

  function showSuccessToast() {
    toast.success("Submitted Successfully!", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Slide,
    });
  }

  const handleRegister = async (e) => {
    e.preventDefault();
    // Reset all errors
    setError("");
    setNameError("");
    setJobTitleError("");
    setDateOfBirthError("");
    setFeedbackError("");

    let hasError = false;

    if (!name) {
      setNameError("Name is required.");
      hasError = true;
    }

    if (!jobTitle) {
      setJobTitleError("Job title is required.");
      hasError = true;
    }

    if (!dateOfBirth) {
      setDateOfBirthError("Date of birth is required.");
      hasError = true;
    }

    if (!feedback) {
      setFeedbackError("This field is required.");
      hasError = true;
    }

    if (hasError) {
      return;
    }

    setLoading(true);
    const dateOfBirthObject = new Date(dateOfBirth);
    try {
      const result = await axios.post(
        "https://me-central2-sultankh-sultankhub.cloudfunctions.net/createRecord",
        {
          name: name,
          jobTitle: jobTitle,
          dateOfBirth: dateOfBirthObject,
          feedback: feedback,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      showSuccessToast();
      resetFields();
      console.log(result);
    } catch (error) {
      console.error(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  function resetFields() {
    setName("");
    setJobTitle("");
    setFeedback("");
    setDateOfBirth(new Date().toISOString().split("T")[0]);
    setNameError("");
    setJobTitleError("");
    setDateOfBirthError("");
    setFeedbackError("");
    setError("");
  }

  return (
    <>
      <div className="h-screen w-full flex flex-row items-center justify-center">
        <div className="flex flex-col items-center min-w-[25rem] max-w-[30rem] bg-white p-6 rounded-md shadow-lg">
          <h1 className="font-medium lg:text-2xl mb-4 md:text-lg sm:text-base">
            Hi there! 👋🏻
          </h1>
          <form className="w-full" onSubmit={handleRegister}>
            <p className="mb-2 font-medium text-sm">Name</p>
            <input
              className={`h-9 w-full mb-1 px-2 text-sm font-normal border-2 rounded-sm border-[#efeeee] focus:outline-none focus:ring-0 ${
                nameError
                  ? "border-red-500 focus:border-red-500"
                  : "border-[#efeeee] focus:border-[#a4c1f0]"
              }`}
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              type="text"
              disabled={isLoading}
            />
            <p className="mb-4 font-medium text-xs text-red-500">{nameError}</p>

            <p className="mb-2 font-medium text-sm">Job Title</p>
            <input
              className={`h-9 w-full mb-1 px-2 text-sm font-normal border-2 rounded-sm border-[#efeeee] focus:outline-none focus:ring-0 ${
                jobTitleError
                  ? "border-red-500 focus:border-red-500"
                  : "border-[#efeeee] focus:border-[#a4c1f0]"
              }`}
              value={jobTitle}
              onChange={(e) => {
                setJobTitle(e.target.value);
              }}
              type="text"
              disabled={isLoading}
            />
            <p className="mb-4 font-medium text-xs text-red-500">
              {jobTitleError}
            </p>

            <p className="mb-2 font-medium text-sm">Date of Birth</p>
            <input
              className={`h-9 w-full mb-1 px-2 text-sm font-normal border-2 rounded-sm border-[#efeeee] focus:outline-none focus:ring-0 ${
                dateOfBirthError
                  ? "border-red-500 focus:border-red-500"
                  : "border-[#efeeee] focus:border-[#a4c1f0]"
              }`}
              value={dateOfBirth}
              onChange={(e) => {
                console.log(e.target.value);
                setDateOfBirth(e.target.value);
              }}
              type="date"
              disabled={isLoading}
            />
            <p className="mb-4 font-medium text-xs text-red-500">
              {dateOfBirthError}
            </p>

            <p className="mb-2 font-medium text-sm">Your Feedback</p>
            <input
              className={`h-9 w-full mb-1 px-2 text-sm font-normal border-2 rounded-sm border-[#efeeee] focus:outline-none focus:ring-0${
                feedbackError
                  ? "border-red-500 focus:border-red-500"
                  : "border-[#efeeee] focus:border-[#a4c1f0]"
              }`}
              value={feedback}
              onChange={(e) => {
                setFeedback(e.target.value);
              }}
              type="text"
              placeholder="Your feedback about this article!"
              disabled={isLoading}
            />
            <p className="mb-4 font-medium text-xs text-red-500">
              {feedbackError}
            </p>

            <button
              className="bg-[#6f88f8] px-5 py-2 rounded-sm w-full font-medium text-white"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <img
                  src="/loading_indicator.svg"
                  alt="Loading..."
                  className="h-5 w-5 m-auto"
                />
              ) : (
                "Submit"
              )}
            </button>

            {error ? (
              <p className="mt-4 font-medium text-xs text-red-500 text-center">
                {error}
              </p>
            ) : null}
          </form>
        </div>
      </div>
    </>
  );
}

export default Home;

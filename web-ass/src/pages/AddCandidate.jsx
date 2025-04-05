import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { addCandidate } from "../store/candidatesSlice";

const AddCandidate = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [appliedFor, setAppliedFor] = useState("");
  const [skills, setSkills] = useState([""]);
  const [error, setError] = useState("");

  const handleSkillChange = (index, value) => {
    const newSkills = [...skills];
    newSkills[index] = value;
    setSkills(newSkills);
  };

  const addSkill = () => setSkills([...skills, ""]);
  const removeSkill = (index) => setSkills(skills.filter((_, i) => i !== index));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !appliedFor || skills.some((skill) => !skill)) {
      setError("All fields are required.");
      return;
    }
    const candidate = {
      id: uuidv4(),
      name,
      appliedFor,
      skills,
    };
    dispatch(addCandidate(candidate));
    setName("");
    setAppliedFor("");
    setSkills([""]);
    setError("");
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 max-w-md mx-auto bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-center mb-6">Add New Candidate</h2>
      {error && <p className="text-red-600 mb-4 text-center">{error}</p>}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="block w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <select
          value={appliedFor}
          onChange={(e) => setAppliedFor(e.target.value)}
          className="block w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Role</option>
          <option value="Frontend Developer">Frontend Developer</option>
          <option value="Backend Developer">Backend Developer</option>
          <option value="Data Scientist">Data Scientist</option>
        </select>
      </div>
      {skills.map((skill, i) => (
        <div key={i} className="flex items-center gap-2 mb-4">
          <input
            type="text"
            placeholder={`Skill ${i + 1}`}
            value={skill}
            onChange={(e) => handleSkillChange(i, e.target.value)}
            className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="button"
            onClick={() => removeSkill(i)}
            className="text-red-600 hover:text-red-800 transition duration-200"
          >
            Remove
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={addSkill}
        className="text-blue-600 hover:text-blue-800 mb-4"
      >
        Add More Skills
      </button>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-200"
      >
        Submit
      </button>
    </form>
  );
};

export default AddCandidate;

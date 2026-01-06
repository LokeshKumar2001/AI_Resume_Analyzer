export const postResumeData = async (req, res) => {
  const { resumeText } = req.body;
  try {
    if (!resumeText || !resumeText.trim()) {
      return res.status(422).json({ message: "Please paste the resume " });
    }

    return res.status(200).json({
      success: true,
      data: resumeText,
      message: "Resume received successfully.",
      resumeLength: resumeText.length,
      feedback: "Review respone",
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server error" });
  }
};

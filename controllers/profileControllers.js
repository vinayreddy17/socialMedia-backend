import User from '../models/user.js';

//  to fetch user profile
export const getUserProfile = async (req, res) => {
  try {
    const { email } = req.params;
   
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
   
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

//  to update user profile//for now this is not used by frontend
export const updateUserProfile = async (req, res) => {
  try {
    const { email } = req.params;
   
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user = await User.findOneAndUpdate({ email }, req.body, { new: true });
   
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};


export const deleteUserAccount = async (req, res) => {
  try {
    const { email } = req.params;
    
    await User.findOneAndDelete({ email });
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

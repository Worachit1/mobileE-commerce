import { Request, Response } from "express"; 
import { UserAddressParams, userLoginParams, userModelParams } from "../dto/User";
import { USERLOG } from "../Models/UserModel";

export const userRegistration = async(req:Request, res:Response): Promise<void> => {
    const {firstName, lastName, email, mobileNo, password, confirmPassword} =<userModelParams>req.body
    const userRegistration = new USERLOG({
        firstName,
        lastName,
        email,
        mobileNo,
        password,
        confirmPassword,
    })

    console.log('req.body', userRegistration)

    try {
        const checkEmail = await USERLOG.findOne({email})

        if(checkEmail){
             res.status(402).json({message:'Email Alredy in user by another User'})
             return;
        }else if(password !== confirmPassword){
             res.status(402).json('Password does not Match')
             return;
        }

        await userRegistration.save();
        res.status(200).json('Registration create Successfully')
    } catch(err) {
        res.status(500).json(`Registration failed ${err}`)
    }
} 

export const userLogin = async(req:Request, res:Response): Promise<void> => {
    

    try {

        const {email, password} =<userLoginParams>req.body

        console.log('req.body', email, password)

        const user = await USERLOG.findOne({email})
        if(!user){
             res.status(402).json({message:'Email a valid user name'})
             return;
        }else if(user.password !== password){
             res.status(402).json('Enter a valid password')
             return;
        }

        const token = user._id
        console.log('user token', token)
        res.status(200).json({token})


    } catch(err) {
        res.status(500).json({message: err})
    }
} 

export const createUserAddress = async(req:Request, res:Response): Promise<void> => {
   
    try {
        const {getUserId, userAddressForm} = <UserAddressParams>req.body
        const user = await USERLOG.findById(getUserId);

        if(!user){
            res.status(404).json({message: 'User not found'})
            return;
        }

        user.userAddressInfo.push(userAddressForm)

        console.log('user', user.userAddressInfo)
        await user.save();
       res.status(200).json(userAddressForm)
    
    
    } catch(err) {
        res.status(500).json(`An error occured ${err}`)
    }
} 

export const fetchUserAddress = async (req:Request, res:Response) => {

    try{
        const getUserId = req.params.getUserId;

        console.log(`thhs is the user id at Adress level ${getUserId}`)

        const user = await USERLOG.findById(getUserId)
        if(!user){
            res.status(404).json({message: 'User no Found'})
            return;
        }
        const UserAddress = user.userAddressInfo

        res.status(200).json({UserAddress})
        //console.log('user address array', UserAddress)
    
    
    } catch(err) {
        res.status(500).json(`An error occured ${err}`)
    }
    
}

export const getUserProfile = async (req: Request, res: Response): Promise<void> => {
    try {
        const getUserId = req.params.id; // Fetching the ID from the URL params

        if (!getUserId) {
            res.status(400).json({ message: "User ID is required" });
            return;
        }

        // Fetching user by ID
        const user = await USERLOG.findById(getUserId);
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        const userProfile = user;
        // console.log('......',userProfile)


        res.status(200).json({ userProfile });
    } catch (err) {
        console.error("Error fetching user profile:", err);
        res.status(500).json({ message: `An error occurred: ${err}` });
    }
};

export const updateUserProfile = async (req: Request, res: Response): Promise<void> => {
    try {
        const { firstName, lastName, email, mobileNo, password, confirmPassword } = req.body as userModelParams;

        const user = await USERLOG.findByIdAndUpdate(
            req.params.id,
            {
                firstName,
                lastName,
                email,
                mobileNo,
                password,
                confirmPassword,
            },
            { new: true }
        );

        if (!user) {
            res.status(500).send("The user cannot be updated");
            return;
        }

        res.status(200).json({ success: true, message: "User updated successfully", user });
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ success: false, message: "An error occurred while updating the user" });
    }
}

export const deleteUser = async (req: Request, res: Response): Promise<void> => {    
    try {
        const user = await USERLOG.findByIdAndDelete(req.params.id);

        if (!user) {
            res.status(500).send('The user cannot be deleted');
            return; // หยุดฟังก์ชันเมื่อส่ง response
        }

        res.status(200).json('User deleted successfully');
    } catch (error) {
        res.status(500).send('An error occurred while deleting the user');
    }
}

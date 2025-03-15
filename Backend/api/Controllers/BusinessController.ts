import { Request, Response } from "express";
import {businessModelParams , businessLoginParams} from "../dto/Businesser";
import { BUSINESSLOG } from "../Models/BusinessModel";

export const businessRegistration = async(req:Request, res:Response): Promise<void> => {
    const {firstName, lastName, email, mobileNo, password, confirmPassword} =<businessModelParams>req.body
    const businessRegistration = new BUSINESSLOG({
        firstName,
        lastName,
        email,
        mobileNo,
        password,
        confirmPassword,
    })

    console.log('req.body', businessRegistration)

    try {
        const checkEmail = await BUSINESSLOG.findOne({email})

        if(checkEmail){
             res.status(402).json({message:'Email Alredy in user by another User'})
             return;
        }else if(password !== confirmPassword){
             res.status(402).json('Password does not Match')
             return;
        }

        await businessRegistration.save();
        res.status(200).json('Registration create Successfully')
    } catch(err) {
        res.status(500).json(`Registration failed ${err}`)
    }
}

export const businessLogin = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = <businessLoginParams>req.body;

        console.log('req.body', email, password);

        const business = await BUSINESSLOG.findOne({ email });

        if (!business) {
            res.status(402).json({ message: 'Email a valid user name' });
            return;
        } else if (business.password !== password) {
            res.status(402).json({ message: 'Enter a valid password' });
            return;
        }

        console.log('Business object:', business);  // ✅ Debug ดูข้อมูล business

        const token = business._id.toString();  // ✅ ใช้ _id เป็น token
        const businessId = token;  // ✅ ใช้ token แทน businessId

        console.log('business token', token);
        console.log('businessId:', businessId); // ✅ businessId == token

        res.status(200).json({ token, businessId });

    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
};


export const getBusinessById = async (req:Request, res:Response) => {

    try{
        const business = await BUSINESSLOG.findById(req.params.id)
        res.status(200).json(business)
    }catch(err) {
        res.status(500).json(`fetch Business failed ${err}`)
    }
}

export const getAllBusiness = async (req:Request, res:Response) => {

    try{
        const business = await BUSINESSLOG.find().limit(30)
        res.status(200).json(business)
    }catch(err) {
        res.status(500).json(`Business not found${err}`)
    }
}

export const updateBusiness = async (req: Request, res: Response): Promise<void> => {
    try {
        const { firstName, lastName, email, mobileNo, password, confirmPassword } = req.body as businessModelParams;
        const files = req.files as [Express.Multer.File];

        if (files) {
            const businessUpdate = await BUSINESSLOG.findByIdAndUpdate(
                req.params.id,
                { firstName, lastName, email, mobileNo, password, confirmPassword },
                { new: true } // ใช้ 'new' เพื่อให้ได้ผลลัพธ์ที่อัปเดตแล้ว
            );

            if (!businessUpdate) {
                res.status(500).send('The business cannot be updated');
                return; // หยุดฟังก์ชันเมื่อส่ง response
            }

            res.status(200).json('Business updated successfully');
        } else {
            const businessUpdate = await BUSINESSLOG.findByIdAndUpdate(
                req.params.id,
                { firstName, lastName, email, mobileNo, password, confirmPassword }
            );

            if (!businessUpdate) {
                res.status(500).send('The business cannot be updated');
                return; // หยุดฟังก์ชันเมื่อส่ง response
            }

            res.status(200).json('Business updated successfully');
        }
    } catch (err) {
        res.status(500).json(`Business update failed ${err}`);
    }
}

export const deleteBusiness = async (req: Request, res: Response): Promise<void> => {
    try {
        const business = await BUSINESSLOG.findByIdAndDelete(req.params.id);

        if (!business) {
            res.status(500).send('The business cannot be deleted');
            return; // หยุดฟังก์ชันเมื่อส่ง response
        }

        res.status(200).json('Business deleted successfully');
    } catch (error) {
        res.status(500).send('An error occurred while deleting the business');
    }
}
import authModel from "../models/authSchema.js";
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';


export const signup = async (req, res, next) => {
    const { name, email, password } = req.body;

    const user = await authModel.findOne({ email });

    console.log("user", user);

    if (user) {
        throw new Error("user already exists")
    };


    if (!email || !password) {
        throw new Error("Please provide email or password")
    }


    const hashedPassword = bcryptjs.hashSync(password, 10);

    const newUser = new authModel({ name, email, password: hashedPassword });


    try {
        await newUser.save();
        res.status(201).json({
            message: "User created successfully"
        });
    } catch (error) {
        next(error);
    }
};





export const signin = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const validUser = await authModel.findOne({ email });

        if (!validUser) {
            return res.status(401).json({
                message: "User not found"
            })
        };


        const validPassword = bcryptjs.compareSync(password, validUser.password);

        if (!validPassword) {
            return res.status(401).json({
                message: "Wrong password"
            });
        }

        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.cookie('access token', token).json({
            message: "Sign in successfully",
            token,
            validUser,
            success: true
        });

    } catch (error) {
        next(error)
    }
};




export const logout = async (req, res) => {
    try {
        res.clearCookie('access_token');

        res.json({
            message: "Logged out successfully",
            error: false,
            success: true,
            data: []
        })
    } catch (err) {
        res.json({
            message: err.message || err,
            error: true,
            success: false,
        })
    }
};








export const google = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await authModel.findOne({ email });
        if (user) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

            res.status(201).cookie('access_token', token, {
                httpOnly: true,
            }).json({
                data: email
            })
        } else {
            const newUser = new authModel({
                name, email, password
            });
            await newUser.save();
            const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
            res.status(201).cookie('access_token', token, {
                httpOnly: true,
            }).json({
                message: "User created through Google"
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}







export const forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await authModel.findOne({ email });

        if (!user) {
            res.status(401).json({
                message: "User not found"
            })
        };

        const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' })

        const sendMail = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.ethereal.email',
            port: 587,
            secure: false,
            auth: {
                user: 'your-smtp-username',
                pass: 'your-smtp-password'
            }
        });


        const mailOptions = {
            from: 'shuklaanurag310@gmail.com',
            to: email,
            subject: 'Sending Email using Node.js',
            text: 'That was easy!'
        };

        await transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
};




export const updateUser = async (req, res) => {

    const userId = req.params.id;
    const { name, email } = req.body;
    
    try {
        const updatedUser = await authModel.findByIdAndUpdate(userId, {
            name,
            email
        });

        if (!updatedUser) {
            res.status(401).json({
                message: "User not found!"
            })
        };
        await updatedUser.save();

        res.status(201).json({
            message: "User Updated Successfully",
            updatedUser
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}
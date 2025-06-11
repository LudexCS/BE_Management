import {Router} from "express";
import {DiscountRequestDto, DiscountResponseDto} from "../dto/discount.dto";
import {getUserIdByEmail} from "../grpc/auth.client";
import {registerDiscountControl} from "../controller/discount.controller";

const router: Router = Router();

router.post('/register', async (req, res) => {
    try {
        const dto: DiscountRequestDto = req.body;
        const email = req.user;
        if (!email) throw new Error('Invalid user');
        dto.userId = await getUserIdByEmail(email);
        const response: DiscountResponseDto = await registerDiscountControl(dto);
        res.status(201).json(response);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(500).json({ message: "Server Error" });
        }
    }
});

export default router;
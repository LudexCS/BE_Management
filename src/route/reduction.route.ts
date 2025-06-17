import {Router} from "express";
import {DiscountResponseDto} from "../dto/discount.dto";
import {getUserIdByEmail} from "../grpc/auth.client";
import {registerReductionControl} from "../controller/discount.controller";
import {ReductionRequestDto} from "../dto/reduction.dto";

const router: Router = Router();

router.post('/register', async (req, res) => {
    try {
        const dto: ReductionRequestDto = req.body;
        const email = req.user;
        if (!email) throw new Error('Invalid user');
        dto.userId = await getUserIdByEmail(email);
        const response: DiscountResponseDto[] = await registerReductionControl(dto);
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
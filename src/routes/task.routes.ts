import { Router } from 'express';
import { TaskController } from '../app.controller';

const router = Router();
const taskController = new TaskController();

router.get('/', taskController.getTasks);
router.get('/:id', taskController.getTaskById);
router.post('/', taskController.createTask);
router.put('/:id', taskController.updateTask);
router.delete('/:id', taskController.deleteTask);

export const taskRoutes = router;
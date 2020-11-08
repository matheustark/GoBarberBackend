import { Router } from 'express';
import { startOfHour, parseISO } from 'date-fns';

import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

const appointmentsRouter = Router();
const appointmentsReposiory = new AppointmentsRepository();

appointmentsRouter.post('/', (request, response) => {
  const { provider, date } = request.body;

  const parsedDate = startOfHour(parseISO(date));

  const findAppointmentInSameDate = appointmentsReposiory.findByDate(
    parsedDate,
  );

  if (findAppointmentInSameDate) {
    return response
      .status(400)
      .json({ message: 'This aapointment is already booked' });
  }

  const appointment = appointmentsReposiory.create(provider, parsedDate);

  return response.json(appointment);
});

export default appointmentsRouter;

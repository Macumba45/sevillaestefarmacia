// // user.test.ts
// import { NextApiRequest, NextApiResponse } from 'next';
// import handler from '../../../pages/api/user/getUserInfo';

// test('should return user data', async () => {
//     const req = {} as NextApiRequest
//     const res = {} as NextApiResponse
//     res.status = jest.fn().mockReturnValue(res);
//     res.json = jest.fn();

//     await handler(req, res);

//     // Realiza aserciones en la respuesta
//     expect(res.status).toHaveBeenCalledWith(200);
//     expect(res.json).toHaveBeenCalledWith({
//         id: 1,
//         name: 'John Doe',
//         email: 'john@example.com',
//     });
// });

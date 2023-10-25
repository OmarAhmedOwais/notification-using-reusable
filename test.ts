// export const register = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
//     const { registrationType, email, phone, password } = req.body as RegisterBody;
  
//     try {
//       if (registrationType === "email") {
//         await registerWithEmail(email, password, res);
//       } else if (registrationType === "phone") {
//         await registerWithPhone(phone, res);
//       } else {
//         throw new ApiError({
//           en: "Invalid registration type",
//           ar: "نوع التسجيل غير صالح",
//         }, StatusCodes.BAD_REQUEST);
//       }
//     } catch (error) {
//       next(error);
//     }
//   });

  
//   async function registerWithEmail(email: string, password: string, res: Response) {
//     const existingUser = await UserModel.findOne({ email });
  
//     if (existingUser) {
//       throw new ApiError(
//         {
//           en: `User ${email} already exists`,
//           ar: `موجود بالفعل ${email} المستخدم`,
//         },
//         StatusCodes.BAD_REQUEST
//       );
//     }
  
//     const user = await UserModel.create({ email, password });
//     const token = user.createToken();
  
//     sendRegistrationResponse(res, "email", email, token);
//   }

  
//   async function registerWithPhone(phone: string, res: Response) {
//     const existingUser = await UserModel.findOne({ phone });
  
//     if (existingUser) {
//       throw new ApiError(
//         {
//           en: `User ${phone} already exists`,
//           ar: `موجود بالفعل ${phone} المستخدم`,
//         },
//         StatusCodes.BAD_REQUEST
//       );
//     }
  
//     const user = await UserModel.create({ phone });
//     const token = user.createToken();
  
//     sendRegistrationResponse(res, "phone", phone, token);
//   }
  

//   function sendRegistrationResponse(res: Response, registrationType: string, userIdentifier: string, token: string) {
//     res.status(StatusCodes.CREATED).json({
//       status: Status.SUCCESS,
//       message: {
//         en: "Registered successfully",
//         ar: "تم التسجيل بنجاح",
//       },
//       data: {
//         [registrationType]: userIdentifier,
//       },
//       token,
//     });
//   }
  

// export const register = expressAsyncHandler(
//     async (req: Request, res: Response, next: NextFunction) => {
//       // 1- take data from request body
//       const { registrationType, email, phone, password } = req.body as RegisterBody;
//       console.log(registrationType);
      
  
//       if (registrationType === "email") {
//         const existingUser = await UserModel.findOne({ email: email });
//         console.log(existingUser);
  
//         if (existingUser) {
//           return next(
//             new ApiError(
//               {
//                 en: `User ${email} already exists`,
//                 ar: `موجود بالفعل ${email} المستخدم`,
//               },
//               StatusCodes.BAD_REQUEST
//             )
//           );
//         }
  
//         const user = await UserModel.create({ email, password });
//         const token = user.createToken();
  
//         res.status(StatusCodes.CREATED).json({
//           status: Status.SUCCESS,
//           message: {
//             en: "registered successfully",
//             ar: "تم التسجيل بنجاح",
//           },
//           data: {
//             user: email,
//           },
//           token,
//         });
//       }
//       if(registrationType === "phone"){
//         console.log("------------start-------");
        
//         const existingUser = await UserModel.findOne({ phone: phone });
//         console.log(existingUser);
  
//         if (existingUser) {
//           return next(
//             new ApiError(
//               {
//                 en: `User ${phone} already exists`,
//                 ar: `موجود بالفعل ${phone} المستخدم`,
//               },
//               StatusCodes.BAD_REQUEST
//             )
//           );
//         }
//         console.log(existingUser);
        
  
//         const user = await UserModel.create({ phone });
//         console.log(user);
        
//         const token = user.createToken();
//         console.log(token);
        
  
//         res.status(StatusCodes.CREATED).json({
//           status: Status.SUCCESS,
//           message: {
//             en: "registered successfully",
//             ar: "تم التسجيل بنجاح",
//           },
//           data: {
//             user: phone,
//           },
//           token,
//         });
//       }
//     }
//   );
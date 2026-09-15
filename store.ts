'use client';

import { CRMDatabase } from './types';
import { db as firestoreDb } from './lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const STORAGE_KEY = 'templefit_holistic_students_v5';

const DEFAULT_DB: CRMDatabase = {
  students: [
  {
    "id": "std-vip-antonio",
    "name": "Antonio Eid",
    "phone": "+59171000000",
    "email": "antonio.eid@templefit.com",
    "instructorAssigned": "Paulo Alberto Gil Cuellar (Head Coach)",
    "status": "active",
    "plan": "Coaching 1 a 1",
    "startDate": "2026-08-01",
    "renewalDate": "2026-09-15",
    "birthDate": "1988-01-01",
    "paidServiceTitle": "Coaching Personalizado 1 a 1 (450 Bs.)",
    "serviceFeeBs": 450,
    "billingCycle": "mensual",
    "paymentStatus": "pagado",
    "amountPaidBs": 450,
    "pendingBalanceBs": 0,
    "lastPaymentDate": "2026-08-05",
    "nextDueDate": "2026-09-01",
    "additionalServices": [
      "Snack Bar Prepago",
      "ElectroHidra"
    ],
    "snackBarBalanceBs": 50,
    "physicalGoal": "Fuerza funcional, calistenia y pérdida de 4kg de grasa",
    "weightKg": 55,
    "heightM": 1.6,
    "workoutLevel": "Principiante",
    "currentRoutineExercises": "1. Dominadas estrictas (4x8)\n2. Fondos en paralelas (4x10)\n3. Sentadilla búlgara (4x12)\n4. Flexiones diamante (4x15)\n5. Buteyko y cardio matutino 06:00 AM",
    "nutritionPlan": "Protocolo Salomón + Proteína Limpia",
    "currentDiet": "Desayuno con café y pan, almuerzo irregular, cenas pesadas.",
    "prescribedDiet": "06:00 AM: ElectroHidra 1L. 08:00 AM: Bowl de Elías. Almuerzo anti-inflamatorio con proteína limpia y verduras.",
    "allergiesOrRestrictions": "Sensibilidad a la lactosa",
    "eatingDisordersOrIssues": "Tendencia a picoteo por estrés en horario laboral",
    "neuroticAndStressFactors": "Tensión cervical por jornadas frente a pantalla y cortisol elevado",
    "spiritualIntention": "Consolidar la disciplina del despertar a las 05:30 AM con oración y enfoque.",
    "mentorshipNotes": "Atleta integrado al escuadrón Paz-Alfa. Compromiso regular en sesiones CristoFit Camp.",
    "attendanceHistory": [
      {
        "date": "2026-08-20",
        "attended": true,
        "notes": "Sesión CristoFit Camp - 100%"
      },
      {
        "date": "2026-08-22",
        "attended": true,
        "notes": "Entrenamiento de fuerza y calistenia"
      },
      {
        "date": "2026-08-24",
        "attended": true,
        "notes": "Movilidad articular y Buteyko"
      }
    ],
    "assessments": [
      {
        "date": "2026-08-01",
        "weightKg": 56.8,
        "heightM": 1.6,
        "imc": 22.2,
        "notes": "Evaluación inicial de ciclo"
      },
      {
        "date": "2026-08-22",
        "weightKg": 55,
        "heightM": 1.6,
        "imc": 21.5,
        "notes": "Progreso notable en resistencia y fuerza"
      }
    ],
    "escuadronId": "Paz-Alfa",
    "phase": "1 - Iniciación",
    "isVipProfile": true,
    "hubConsumption": {
      "snackBar": true,
      "merchandise": true,
      "preventiveMedicine": true
    },
    "avatarUrl": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80"
  },
  {
    "id": "std-1",
    "name": "Carlos Gutiérrez",
    "phone": "+59171083719",
    "email": "carlos.gutierrez@templefit.com",
    "instructorAssigned": "Paulo Alberto Gil Cuellar (Head Coach)",
    "status": "active",
    "plan": "Reto 21 Días",
    "startDate": "2026-08-01",
    "renewalDate": "2026-09-15",
    "birthDate": "1989-02-04",
    "paidServiceTitle": "Reto 21 Días - Transformación Inicial (200 Bs.)",
    "serviceFeeBs": 200,
    "billingCycle": "mensual",
    "paymentStatus": "pagado",
    "amountPaidBs": 200,
    "pendingBalanceBs": 0,
    "lastPaymentDate": "2026-08-05",
    "nextDueDate": "2026-09-01",
    "additionalServices": [
      "Chequeo Antropométrico"
    ],
    "snackBarBalanceBs": 0,
    "physicalGoal": "Composición corporal, masa muscular magra y resistencia",
    "weightKg": 62.5,
    "heightM": 1.63,
    "workoutLevel": "Principiante",
    "currentRoutineExercises": "1. Calistenia funcional básica y movilidad\n2. Sentadillas con peso corporal (4x15)\n3. Flexiones en barra inclinada (4x10)\n4. Planchas isométricas (4x45s)\n5. Caminata activa y respiración nasal",
    "nutritionPlan": "ElectroHidra + Nutrición Anti-inflamatoria",
    "currentDiet": "Comida rápida al mediodía, picoteo dulce por ansiedad en la tarde.",
    "prescribedDiet": "Plan Base Anti-inflamatorio. Snacks de frutos secos y batido verde. Cena ligera antes de las 20:00.",
    "allergiesOrRestrictions": "Ninguna",
    "eatingDisordersOrIssues": "Sin trastornos diagnosticados.",
    "neuroticAndStressFactors": "Manejo de estrés cotidiano.",
    "spiritualIntention": "Superar la pereza mental y liderar con el ejemplo en su hogar y trabajo.",
    "mentorshipNotes": "Atleta integrado al escuadrón Paz-Beta. Compromiso regular en sesiones CristoFit Camp.",
    "attendanceHistory": [
      {
        "date": "2026-08-20",
        "attended": true,
        "notes": "Sesión CristoFit Camp - 100%"
      },
      {
        "date": "2026-08-22",
        "attended": true,
        "notes": "Entrenamiento de fuerza y calistenia"
      },
      {
        "date": "2026-08-24",
        "attended": true,
        "notes": "Movilidad articular y Buteyko"
      }
    ],
    "assessments": [
      {
        "date": "2026-08-01",
        "weightKg": 64.3,
        "heightM": 1.63,
        "imc": 24.2,
        "notes": "Evaluación inicial de ciclo"
      },
      {
        "date": "2026-08-22",
        "weightKg": 62.5,
        "heightM": 1.63,
        "imc": 23.5,
        "notes": "Progreso notable en resistencia y fuerza"
      }
    ],
    "escuadronId": "Paz-Beta",
    "phase": "1 - Iniciación",
    "isVipProfile": false,
    "hubConsumption": {
      "snackBar": false,
      "merchandise": false,
      "preventiveMedicine": false
    },
    "avatarUrl": ""
  },
  {
    "id": "std-2",
    "name": "Mariana Flores",
    "phone": "+59171167438",
    "email": "mariana.flores@templefit.com",
    "instructorAssigned": "Paulo Alberto Gil Cuellar (Head Coach)",
    "status": "active",
    "plan": "Reto 21 Días",
    "startDate": "2026-08-01",
    "renewalDate": "2026-09-15",
    "birthDate": "1990-03-07",
    "paidServiceTitle": "Reto 21 Días - Transformación Inicial (200 Bs.)",
    "serviceFeeBs": 200,
    "billingCycle": "mensual",
    "paymentStatus": "pagado",
    "amountPaidBs": 200,
    "pendingBalanceBs": 0,
    "lastPaymentDate": "2026-08-05",
    "nextDueDate": "2026-09-01",
    "additionalServices": [
      "Snack Bar Prepago",
      "ElectroHidra"
    ],
    "snackBarBalanceBs": 0,
    "physicalGoal": "Fuerza funcional, calistenia y pérdida de 4kg de grasa",
    "weightKg": 70,
    "heightM": 1.66,
    "workoutLevel": "Principiante",
    "currentRoutineExercises": "1. Muscle-ups y fondos lastrados (4x6)\n2. Dominadas con agarre supino (4x10)\n3. Pistols asistidos (4x8 p/lado)\n4. Flexiones pliométricas (4x12)\n5. Sparring técnico y Buteyko",
    "nutritionPlan": "Catering Saludable Abuela Fit + Hidratación Activa",
    "currentDiet": "Dieta hipercalórica desordenada, bajo consumo de agua.",
    "prescribedDiet": "Catering Abuela Fit + 3L de agua alcalina con electrolitos naturales. Suplemento con glutamina.",
    "allergiesOrRestrictions": "Ninguna",
    "eatingDisordersOrIssues": "Sin trastornos diagnosticados.",
    "neuroticAndStressFactors": "Manejo de estrés cotidiano.",
    "spiritualIntention": "Buscar paz interior frente al estrés laboral mediante devocionales y Buteyko.",
    "mentorshipNotes": "Atleta integrado al escuadrón Paz-Gamma. Compromiso regular en sesiones CristoFit Camp.",
    "attendanceHistory": [
      {
        "date": "2026-08-20",
        "attended": true,
        "notes": "Sesión CristoFit Camp - 100%"
      },
      {
        "date": "2026-08-22",
        "attended": true,
        "notes": "Entrenamiento de fuerza y calistenia"
      },
      {
        "date": "2026-08-24",
        "attended": true,
        "notes": "Movilidad articular y Buteyko"
      }
    ],
    "assessments": [
      {
        "date": "2026-08-01",
        "weightKg": 71.8,
        "heightM": 1.66,
        "imc": 26.1,
        "notes": "Evaluación inicial de ciclo"
      },
      {
        "date": "2026-08-22",
        "weightKg": 70,
        "heightM": 1.66,
        "imc": 25.4,
        "notes": "Progreso notable en resistencia y fuerza"
      }
    ],
    "escuadronId": "Paz-Gamma",
    "phase": "1 - Iniciación",
    "isVipProfile": false,
    "hubConsumption": {
      "snackBar": true,
      "merchandise": false,
      "preventiveMedicine": false
    },
    "avatarUrl": ""
  },
  {
    "id": "std-3",
    "name": "José Luis Mamani",
    "phone": "+59171251157",
    "email": "jose.luis.mamani@templefit.com",
    "instructorAssigned": "Paulo Alberto Gil Cuellar (Head Coach)",
    "status": "active",
    "plan": "Reto 21 Días",
    "startDate": "2026-08-01",
    "renewalDate": "2026-09-15",
    "birthDate": "1991-04-10",
    "paidServiceTitle": "Reto 21 Días - Transformación Inicial (200 Bs.)",
    "serviceFeeBs": 200,
    "billingCycle": "mensual",
    "paymentStatus": "pagado",
    "amountPaidBs": 200,
    "pendingBalanceBs": 0,
    "lastPaymentDate": "2026-08-05",
    "nextDueDate": "2026-09-01",
    "additionalServices": [
      "Chequeo Antropométrico"
    ],
    "snackBarBalanceBs": 50,
    "physicalGoal": "Composición corporal, masa muscular magra y resistencia",
    "weightKg": 76,
    "heightM": 1.69,
    "workoutLevel": "Principiante",
    "currentRoutineExercises": "1. Flexiones regulares y declinadas (4x15)\n2. Remo invertido en paralelas (4x10)\n3. Estocadas dinámicas (4x12)\n4. Elevación de piernas en barra (4x10)\n5. Cardio CristoFit Camp 06:00 AM",
    "nutritionPlan": "Smoothie de Salomón + Plan Detox 0 Azúcar",
    "currentDiet": "Salteo de comidas, exceso de gaseosas y azúcar refinada.",
    "prescribedDiet": "Detox 21 Días sin azúcar. Smoothie de Salomón matutino, ensaladas verdes y pescado fresco.",
    "allergiesOrRestrictions": "Ninguna",
    "eatingDisordersOrIssues": "Sin trastornos diagnosticados.",
    "neuroticAndStressFactors": "Tensión cervical por jornadas frente a pantalla y cortisol elevado",
    "spiritualIntention": "Liderar su escuadrón con humildad, servicio y constancia innegociable.",
    "mentorshipNotes": "Atleta integrado al escuadrón Paz-Delta. Compromiso regular en sesiones CristoFit Camp.",
    "attendanceHistory": [
      {
        "date": "2026-08-20",
        "attended": true,
        "notes": "Sesión CristoFit Camp - 100%"
      },
      {
        "date": "2026-08-22",
        "attended": true,
        "notes": "Entrenamiento de fuerza y calistenia"
      },
      {
        "date": "2026-08-24",
        "attended": true,
        "notes": "Movilidad articular y Buteyko"
      }
    ],
    "assessments": [
      {
        "date": "2026-08-01",
        "weightKg": 77.8,
        "heightM": 1.69,
        "imc": 27.2,
        "notes": "Evaluación inicial de ciclo"
      },
      {
        "date": "2026-08-22",
        "weightKg": 76,
        "heightM": 1.69,
        "imc": 26.6,
        "notes": "Progreso notable en resistencia y fuerza"
      }
    ],
    "escuadronId": "Paz-Delta",
    "phase": "1 - Iniciación",
    "isVipProfile": false,
    "hubConsumption": {
      "snackBar": false,
      "merchandise": true,
      "preventiveMedicine": false
    },
    "avatarUrl": ""
  },
  {
    "id": "std-4",
    "name": "Daniela Quispe",
    "phone": "+59171334876",
    "email": "daniela.quispe@templefit.com",
    "instructorAssigned": "Paulo Alberto Gil Cuellar (Head Coach)",
    "status": "active",
    "plan": "Reto 21 Días",
    "startDate": "2026-08-01",
    "renewalDate": "2026-09-15",
    "birthDate": "1992-05-13",
    "paidServiceTitle": "Reto 21 Días - Transformación Inicial (200 Bs.)",
    "serviceFeeBs": 200,
    "billingCycle": "mensual",
    "paymentStatus": "pagado",
    "amountPaidBs": 200,
    "pendingBalanceBs": 0,
    "lastPaymentDate": "2026-08-05",
    "nextDueDate": "2026-09-01",
    "additionalServices": [
      "Snack Bar Prepago",
      "ElectroHidra"
    ],
    "snackBarBalanceBs": 0,
    "physicalGoal": "Fuerza funcional, calistenia y pérdida de 4kg de grasa",
    "weightKg": 83.5,
    "heightM": 1.72,
    "workoutLevel": "Intermedio",
    "currentRoutineExercises": "1. Trabajo de core y estabilidad lumbar\n2. Flexiones hindúes y pike pushups (4x10)\n3. Saltos de cuerda (5 rondas x 2 min)\n4. Dominadas escapulares (4x12)\n5. Hidratación con ElectroHidra",
    "nutritionPlan": "Protocolo Salomón + Proteína Limpia",
    "currentDiet": "Desayuno con café y pan, almuerzo irregular, cenas pesadas.",
    "prescribedDiet": "06:00 AM: ElectroHidra 1L. 08:00 AM: Bowl de Elías. Almuerzo anti-inflamatorio con proteína limpia y verduras.",
    "allergiesOrRestrictions": "Ninguna",
    "eatingDisordersOrIssues": "Tendencia a picoteo por estrés en horario laboral",
    "neuroticAndStressFactors": "Manejo de estrés cotidiano.",
    "spiritualIntention": "Alinear cuerpo, mente y espíritu como templo del Creador (1 Corintios 6:19).",
    "mentorshipNotes": "Atleta integrado al escuadrón Gedeón-1. Compromiso regular en sesiones CristoFit Camp.",
    "attendanceHistory": [
      {
        "date": "2026-08-20",
        "attended": true,
        "notes": "Sesión CristoFit Camp - 100%"
      },
      {
        "date": "2026-08-22",
        "attended": true,
        "notes": "Entrenamiento de fuerza y calistenia"
      },
      {
        "date": "2026-08-24",
        "attended": true,
        "notes": "Movilidad articular y Buteyko"
      }
    ],
    "assessments": [
      {
        "date": "2026-08-01",
        "weightKg": 85.3,
        "heightM": 1.72,
        "imc": 28.8,
        "notes": "Evaluación inicial de ciclo"
      },
      {
        "date": "2026-08-22",
        "weightKg": 83.5,
        "heightM": 1.72,
        "imc": 28.2,
        "notes": "Progreso notable en resistencia y fuerza"
      }
    ],
    "escuadronId": "Gedeón-1",
    "phase": "2 - Desarrollo",
    "isVipProfile": false,
    "hubConsumption": {
      "snackBar": true,
      "merchandise": false,
      "preventiveMedicine": true
    },
    "avatarUrl": ""
  },
  {
    "id": "std-5",
    "name": "Andrés Paredes",
    "phone": "+59171418595",
    "email": "andres.paredes@templefit.com",
    "instructorAssigned": "Paulo Alberto Gil Cuellar (Head Coach)",
    "status": "active",
    "plan": "Reto 21 Días",
    "startDate": "2026-08-01",
    "renewalDate": "2026-09-15",
    "birthDate": "1993-06-16",
    "paidServiceTitle": "Reto 21 Días - Transformación Inicial (200 Bs.)",
    "serviceFeeBs": 200,
    "billingCycle": "mensual",
    "paymentStatus": "pagado",
    "amountPaidBs": 200,
    "pendingBalanceBs": 0,
    "lastPaymentDate": "2026-08-05",
    "nextDueDate": "2026-09-01",
    "additionalServices": [
      "Chequeo Antropométrico"
    ],
    "snackBarBalanceBs": 0,
    "physicalGoal": "Composición corporal, masa muscular magra y resistencia",
    "weightKg": 59,
    "heightM": 1.75,
    "workoutLevel": "Intermedio",
    "currentRoutineExercises": "1. Dominadas estrictas (4x8)\n2. Fondos en paralelas (4x10)\n3. Sentadilla búlgara (4x12)\n4. Flexiones diamante (4x15)\n5. Buteyko y cardio matutino 06:00 AM",
    "nutritionPlan": "ElectroHidra + Nutrición Anti-inflamatoria",
    "currentDiet": "Comida rápida al mediodía, picoteo dulce por ansiedad en la tarde.",
    "prescribedDiet": "Plan Base Anti-inflamatorio. Snacks de frutos secos y batido verde. Cena ligera antes de las 20:00.",
    "allergiesOrRestrictions": "Sensibilidad a la lactosa",
    "eatingDisordersOrIssues": "Sin trastornos diagnosticados.",
    "neuroticAndStressFactors": "Manejo de estrés cotidiano.",
    "spiritualIntention": "Cultivar autodominio y templanza en momentos de alta presión profesional.",
    "mentorshipNotes": "Atleta integrado al escuadrón Gedeón-2. Compromiso regular en sesiones CristoFit Camp.",
    "attendanceHistory": [
      {
        "date": "2026-08-20",
        "attended": true,
        "notes": "Sesión CristoFit Camp - 100%"
      },
      {
        "date": "2026-08-22",
        "attended": true,
        "notes": "Entrenamiento de fuerza y calistenia"
      },
      {
        "date": "2026-08-24",
        "attended": true,
        "notes": "Movilidad articular y Buteyko"
      }
    ],
    "assessments": [
      {
        "date": "2026-08-01",
        "weightKg": 60.8,
        "heightM": 1.75,
        "imc": 19.9,
        "notes": "Evaluación inicial de ciclo"
      },
      {
        "date": "2026-08-22",
        "weightKg": 59,
        "heightM": 1.75,
        "imc": 19.3,
        "notes": "Progreso notable en resistencia y fuerza"
      }
    ],
    "escuadronId": "Gedeón-2",
    "phase": "2 - Desarrollo",
    "isVipProfile": false,
    "hubConsumption": {
      "snackBar": false,
      "merchandise": false,
      "preventiveMedicine": false
    },
    "avatarUrl": ""
  },
  {
    "id": "std-6",
    "name": "Valeria Mercado",
    "phone": "+59171502314",
    "email": "valeria.mercado@templefit.com",
    "instructorAssigned": "Paulo Alberto Gil Cuellar (Head Coach)",
    "status": "active",
    "plan": "Reto 21 Días",
    "startDate": "2026-08-01",
    "renewalDate": "2026-09-15",
    "birthDate": "1994-07-19",
    "paidServiceTitle": "Reto 21 Días - Transformación Inicial (200 Bs.)",
    "serviceFeeBs": 200,
    "billingCycle": "mensual",
    "paymentStatus": "pagado",
    "amountPaidBs": 200,
    "pendingBalanceBs": 0,
    "lastPaymentDate": "2026-08-05",
    "nextDueDate": "2026-09-01",
    "additionalServices": [
      "Snack Bar Prepago",
      "ElectroHidra"
    ],
    "snackBarBalanceBs": 50,
    "physicalGoal": "Fuerza funcional, calistenia y pérdida de 4kg de grasa",
    "weightKg": 65,
    "heightM": 1.78,
    "workoutLevel": "Intermedio",
    "currentRoutineExercises": "1. Calistenia funcional básica y movilidad\n2. Sentadillas con peso corporal (4x15)\n3. Flexiones en barra inclinada (4x10)\n4. Planchas isométricas (4x45s)\n5. Caminata activa y respiración nasal",
    "nutritionPlan": "Catering Saludable Abuela Fit + Hidratación Activa",
    "currentDiet": "Dieta hipercalórica desordenada, bajo consumo de agua.",
    "prescribedDiet": "Catering Abuela Fit + 3L de agua alcalina con electrolitos naturales. Suplemento con glutamina.",
    "allergiesOrRestrictions": "Ninguna",
    "eatingDisordersOrIssues": "Sin trastornos diagnosticados.",
    "neuroticAndStressFactors": "Tensión cervical por jornadas frente a pantalla y cortisol elevado",
    "spiritualIntention": "Consolidar la disciplina del despertar a las 05:30 AM con oración y enfoque.",
    "mentorshipNotes": "Atleta integrado al escuadrón Gedeón-3. Compromiso regular en sesiones CristoFit Camp.",
    "attendanceHistory": [
      {
        "date": "2026-08-20",
        "attended": true,
        "notes": "Sesión CristoFit Camp - 100%"
      },
      {
        "date": "2026-08-22",
        "attended": true,
        "notes": "Entrenamiento de fuerza y calistenia"
      },
      {
        "date": "2026-08-24",
        "attended": true,
        "notes": "Movilidad articular y Buteyko"
      }
    ],
    "assessments": [
      {
        "date": "2026-08-01",
        "weightKg": 66.8,
        "heightM": 1.78,
        "imc": 21.1,
        "notes": "Evaluación inicial de ciclo"
      },
      {
        "date": "2026-08-22",
        "weightKg": 65,
        "heightM": 1.78,
        "imc": 20.5,
        "notes": "Progreso notable en resistencia y fuerza"
      }
    ],
    "escuadronId": "Gedeón-3",
    "phase": "2 - Desarrollo",
    "isVipProfile": false,
    "hubConsumption": {
      "snackBar": true,
      "merchandise": true,
      "preventiveMedicine": false
    },
    "avatarUrl": ""
  },
  {
    "id": "std-7",
    "name": "Rodrigo Mendoza",
    "phone": "+59171586033",
    "email": "rodrigo.mendoza@templefit.com",
    "instructorAssigned": "Paulo Alberto Gil Cuellar (Head Coach)",
    "status": "active",
    "plan": "Reto 21 Días",
    "startDate": "2026-08-01",
    "renewalDate": "2026-09-15",
    "birthDate": "1995-08-22",
    "paidServiceTitle": "Reto 21 Días - Transformación Inicial (200 Bs.)",
    "serviceFeeBs": 200,
    "billingCycle": "mensual",
    "paymentStatus": "pagado",
    "amountPaidBs": 200,
    "pendingBalanceBs": 0,
    "lastPaymentDate": "2026-08-05",
    "nextDueDate": "2026-09-01",
    "additionalServices": [
      "Chequeo Antropométrico"
    ],
    "snackBarBalanceBs": 0,
    "physicalGoal": "Composición corporal, masa muscular magra y resistencia",
    "weightKg": 72.5,
    "heightM": 1.81,
    "workoutLevel": "Intermedio",
    "currentRoutineExercises": "1. Muscle-ups y fondos lastrados (4x6)\n2. Dominadas con agarre supino (4x10)\n3. Pistols asistidos (4x8 p/lado)\n4. Flexiones pliométricas (4x12)\n5. Sparring técnico y Buteyko",
    "nutritionPlan": "Smoothie de Salomón + Plan Detox 0 Azúcar",
    "currentDiet": "Salteo de comidas, exceso de gaseosas y azúcar refinada.",
    "prescribedDiet": "Detox 21 Días sin azúcar. Smoothie de Salomón matutino, ensaladas verdes y pescado fresco.",
    "allergiesOrRestrictions": "Ninguna",
    "eatingDisordersOrIssues": "Sin trastornos diagnosticados.",
    "neuroticAndStressFactors": "Manejo de estrés cotidiano.",
    "spiritualIntention": "Superar la pereza mental y liderar con el ejemplo en su hogar y trabajo.",
    "mentorshipNotes": "Atleta integrado al escuadrón Gedeón-4. Compromiso regular en sesiones CristoFit Camp.",
    "attendanceHistory": [
      {
        "date": "2026-08-20",
        "attended": true,
        "notes": "Sesión CristoFit Camp - 100%"
      },
      {
        "date": "2026-08-22",
        "attended": true,
        "notes": "Entrenamiento de fuerza y calistenia"
      },
      {
        "date": "2026-08-24",
        "attended": true,
        "notes": "Movilidad articular y Buteyko"
      }
    ],
    "assessments": [
      {
        "date": "2026-08-01",
        "weightKg": 74.3,
        "heightM": 1.81,
        "imc": 22.7,
        "notes": "Evaluación inicial de ciclo"
      },
      {
        "date": "2026-08-22",
        "weightKg": 72.5,
        "heightM": 1.81,
        "imc": 22.1,
        "notes": "Progreso notable en resistencia y fuerza"
      }
    ],
    "escuadronId": "Gedeón-4",
    "phase": "2 - Desarrollo",
    "isVipProfile": false,
    "hubConsumption": {
      "snackBar": false,
      "merchandise": false,
      "preventiveMedicine": false
    },
    "avatarUrl": ""
  },
  {
    "id": "std-8",
    "name": "Camila Zeballos",
    "phone": "+59171669752",
    "email": "camila.zeballos@templefit.com",
    "instructorAssigned": "Paulo Alberto Gil Cuellar (Head Coach)",
    "status": "expiring",
    "plan": "Reto 21 Días",
    "startDate": "2026-08-01",
    "renewalDate": "2026-08-28",
    "birthDate": "1996-09-25",
    "paidServiceTitle": "Reto 21 Días - Transformación Inicial (200 Bs.)",
    "serviceFeeBs": 200,
    "billingCycle": "mensual",
    "paymentStatus": "pendiente",
    "amountPaidBs": 0,
    "pendingBalanceBs": 200,
    "lastPaymentDate": "",
    "nextDueDate": "2026-09-01",
    "additionalServices": [
      "Snack Bar Prepago",
      "ElectroHidra"
    ],
    "snackBarBalanceBs": 0,
    "physicalGoal": "Fuerza funcional, calistenia y pérdida de 4kg de grasa",
    "weightKg": 80,
    "heightM": 1.84,
    "workoutLevel": "Intermedio",
    "currentRoutineExercises": "1. Flexiones regulares y declinadas (4x15)\n2. Remo invertido en paralelas (4x10)\n3. Estocadas dinámicas (4x12)\n4. Elevación de piernas en barra (4x10)\n5. Cardio CristoFit Camp 06:00 AM",
    "nutritionPlan": "Protocolo Salomón + Proteína Limpia",
    "currentDiet": "Desayuno con café y pan, almuerzo irregular, cenas pesadas.",
    "prescribedDiet": "06:00 AM: ElectroHidra 1L. 08:00 AM: Bowl de Elías. Almuerzo anti-inflamatorio con proteína limpia y verduras.",
    "allergiesOrRestrictions": "Ninguna",
    "eatingDisordersOrIssues": "Tendencia a picoteo por estrés en horario laboral",
    "neuroticAndStressFactors": "Manejo de estrés cotidiano.",
    "spiritualIntention": "Buscar paz interior frente al estrés laboral mediante devocionales y Buteyko.",
    "mentorshipNotes": "Atleta integrado al escuadrón Gedeón-5. Compromiso regular en sesiones CristoFit Camp.",
    "attendanceHistory": [
      {
        "date": "2026-08-20",
        "attended": true,
        "notes": "Sesión CristoFit Camp - 100%"
      },
      {
        "date": "2026-08-22",
        "attended": true,
        "notes": "Entrenamiento de fuerza y calistenia"
      },
      {
        "date": "2026-08-24",
        "attended": true,
        "notes": "Movilidad articular y Buteyko"
      }
    ],
    "assessments": [
      {
        "date": "2026-08-01",
        "weightKg": 81.8,
        "heightM": 1.84,
        "imc": 24.2,
        "notes": "Evaluación inicial de ciclo"
      },
      {
        "date": "2026-08-22",
        "weightKg": 80,
        "heightM": 1.84,
        "imc": 23.6,
        "notes": "Progreso notable en resistencia y fuerza"
      }
    ],
    "escuadronId": "Gedeón-5",
    "phase": "2 - Desarrollo",
    "isVipProfile": false,
    "hubConsumption": {
      "snackBar": true,
      "merchandise": false,
      "preventiveMedicine": true
    },
    "avatarUrl": ""
  },
  {
    "id": "std-9",
    "name": "Fernando Torrico",
    "phone": "+59171753471",
    "email": "fernando.torrico@templefit.com",
    "instructorAssigned": "Paulo Alberto Gil Cuellar (Head Coach)",
    "status": "active",
    "plan": "Reto 21 Días",
    "startDate": "2026-08-01",
    "renewalDate": "2026-09-15",
    "birthDate": "1997-10-01",
    "paidServiceTitle": "Reto 21 Días - Transformación Inicial (200 Bs.)",
    "serviceFeeBs": 200,
    "billingCycle": "mensual",
    "paymentStatus": "pagado",
    "amountPaidBs": 200,
    "pendingBalanceBs": 0,
    "lastPaymentDate": "2026-08-05",
    "nextDueDate": "2026-09-01",
    "additionalServices": [
      "Chequeo Antropométrico"
    ],
    "snackBarBalanceBs": 50,
    "physicalGoal": "Composición corporal, masa muscular magra y resistencia",
    "weightKg": 86,
    "heightM": 1.62,
    "workoutLevel": "Intermedio",
    "currentRoutineExercises": "1. Trabajo de core y estabilidad lumbar\n2. Flexiones hindúes y pike pushups (4x10)\n3. Saltos de cuerda (5 rondas x 2 min)\n4. Dominadas escapulares (4x12)\n5. Hidratación con ElectroHidra",
    "nutritionPlan": "ElectroHidra + Nutrición Anti-inflamatoria",
    "currentDiet": "Comida rápida al mediodía, picoteo dulce por ansiedad en la tarde.",
    "prescribedDiet": "Plan Base Anti-inflamatorio. Snacks de frutos secos y batido verde. Cena ligera antes de las 20:00.",
    "allergiesOrRestrictions": "Ninguna",
    "eatingDisordersOrIssues": "Sin trastornos diagnosticados.",
    "neuroticAndStressFactors": "Tensión cervical por jornadas frente a pantalla y cortisol elevado",
    "spiritualIntention": "Liderar su escuadrón con humildad, servicio y constancia innegociable.",
    "mentorshipNotes": "Atleta integrado al escuadrón Gedeón-6. Compromiso regular en sesiones CristoFit Camp.",
    "attendanceHistory": [
      {
        "date": "2026-08-20",
        "attended": true,
        "notes": "Sesión CristoFit Camp - 100%"
      },
      {
        "date": "2026-08-22",
        "attended": true,
        "notes": "Entrenamiento de fuerza y calistenia"
      },
      {
        "date": "2026-08-24",
        "attended": true,
        "notes": "Movilidad articular y Buteyko"
      }
    ],
    "assessments": [
      {
        "date": "2026-08-01",
        "weightKg": 87.8,
        "heightM": 1.62,
        "imc": 33.5,
        "notes": "Evaluación inicial de ciclo"
      },
      {
        "date": "2026-08-22",
        "weightKg": 86,
        "heightM": 1.62,
        "imc": 32.8,
        "notes": "Progreso notable en resistencia y fuerza"
      }
    ],
    "escuadronId": "Gedeón-6",
    "phase": "2 - Desarrollo",
    "isVipProfile": false,
    "hubConsumption": {
      "snackBar": false,
      "merchandise": true,
      "preventiveMedicine": false
    },
    "avatarUrl": ""
  },
  {
    "id": "std-10",
    "name": "Gabriela Rojas",
    "phone": "+59171837190",
    "email": "gabriela.rojas@templefit.com",
    "instructorAssigned": "Paulo Alberto Gil Cuellar (Head Coach)",
    "status": "active",
    "plan": "Reto 21 Días",
    "startDate": "2026-08-01",
    "renewalDate": "2026-09-15",
    "birthDate": "1998-11-04",
    "paidServiceTitle": "Reto 21 Días - Transformación Inicial (200 Bs.)",
    "serviceFeeBs": 200,
    "billingCycle": "mensual",
    "paymentStatus": "pagado",
    "amountPaidBs": 200,
    "pendingBalanceBs": 0,
    "lastPaymentDate": "2026-08-05",
    "nextDueDate": "2026-09-01",
    "additionalServices": [
      "Snack Bar Prepago",
      "ElectroHidra"
    ],
    "snackBarBalanceBs": 0,
    "physicalGoal": "Fuerza funcional, calistenia y pérdida de 4kg de grasa",
    "weightKg": 61.5,
    "heightM": 1.65,
    "workoutLevel": "Intermedio",
    "currentRoutineExercises": "1. Dominadas estrictas (4x8)\n2. Fondos en paralelas (4x10)\n3. Sentadilla búlgara (4x12)\n4. Flexiones diamante (4x15)\n5. Buteyko y cardio matutino 06:00 AM",
    "nutritionPlan": "Catering Saludable Abuela Fit + Hidratación Activa",
    "currentDiet": "Dieta hipercalórica desordenada, bajo consumo de agua.",
    "prescribedDiet": "Catering Abuela Fit + 3L de agua alcalina con electrolitos naturales. Suplemento con glutamina.",
    "allergiesOrRestrictions": "Sensibilidad a la lactosa",
    "eatingDisordersOrIssues": "Sin trastornos diagnosticados.",
    "neuroticAndStressFactors": "Manejo de estrés cotidiano.",
    "spiritualIntention": "Alinear cuerpo, mente y espíritu como templo del Creador (1 Corintios 6:19).",
    "mentorshipNotes": "Atleta integrado al escuadrón Gedeón-7. Compromiso regular en sesiones CristoFit Camp.",
    "attendanceHistory": [
      {
        "date": "2026-08-20",
        "attended": true,
        "notes": "Sesión CristoFit Camp - 100%"
      },
      {
        "date": "2026-08-22",
        "attended": true,
        "notes": "Entrenamiento de fuerza y calistenia"
      },
      {
        "date": "2026-08-24",
        "attended": true,
        "notes": "Movilidad articular y Buteyko"
      }
    ],
    "assessments": [
      {
        "date": "2026-08-01",
        "weightKg": 63.3,
        "heightM": 1.65,
        "imc": 23.3,
        "notes": "Evaluación inicial de ciclo"
      },
      {
        "date": "2026-08-22",
        "weightKg": 61.5,
        "heightM": 1.65,
        "imc": 22.6,
        "notes": "Progreso notable en resistencia y fuerza"
      }
    ],
    "escuadronId": "Gedeón-7",
    "phase": "2 - Desarrollo",
    "isVipProfile": false,
    "hubConsumption": {
      "snackBar": true,
      "merchandise": false,
      "preventiveMedicine": false
    },
    "avatarUrl": ""
  },
  {
    "id": "std-11",
    "name": "Diego Villarroel",
    "phone": "+59171920909",
    "email": "diego.villarroel@templefit.com",
    "instructorAssigned": "Paulo Alberto Gil Cuellar (Head Coach)",
    "status": "active",
    "plan": "Reto 21 Días",
    "startDate": "2026-08-01",
    "renewalDate": "2026-09-15",
    "birthDate": "1999-12-07",
    "paidServiceTitle": "Reto 21 Días - Transformación Inicial (200 Bs.)",
    "serviceFeeBs": 200,
    "billingCycle": "mensual",
    "paymentStatus": "pagado",
    "amountPaidBs": 200,
    "pendingBalanceBs": 0,
    "lastPaymentDate": "2026-08-05",
    "nextDueDate": "2026-09-01",
    "additionalServices": [
      "Chequeo Antropométrico"
    ],
    "snackBarBalanceBs": 0,
    "physicalGoal": "Composición corporal, masa muscular magra y resistencia",
    "weightKg": 69,
    "heightM": 1.68,
    "workoutLevel": "Intermedio",
    "currentRoutineExercises": "1. Calistenia funcional básica y movilidad\n2. Sentadillas con peso corporal (4x15)\n3. Flexiones en barra inclinada (4x10)\n4. Planchas isométricas (4x45s)\n5. Caminata activa y respiración nasal",
    "nutritionPlan": "Smoothie de Salomón + Plan Detox 0 Azúcar",
    "currentDiet": "Salteo de comidas, exceso de gaseosas y azúcar refinada.",
    "prescribedDiet": "Detox 21 Días sin azúcar. Smoothie de Salomón matutino, ensaladas verdes y pescado fresco.",
    "allergiesOrRestrictions": "Ninguna",
    "eatingDisordersOrIssues": "Sin trastornos diagnosticados.",
    "neuroticAndStressFactors": "Manejo de estrés cotidiano.",
    "spiritualIntention": "Cultivar autodominio y templanza en momentos de alta presión profesional.",
    "mentorshipNotes": "Atleta integrado al escuadrón Gedeón-8. Compromiso regular en sesiones CristoFit Camp.",
    "attendanceHistory": [
      {
        "date": "2026-08-20",
        "attended": true,
        "notes": "Sesión CristoFit Camp - 100%"
      },
      {
        "date": "2026-08-22",
        "attended": true,
        "notes": "Entrenamiento de fuerza y calistenia"
      },
      {
        "date": "2026-08-24",
        "attended": true,
        "notes": "Movilidad articular y Buteyko"
      }
    ],
    "assessments": [
      {
        "date": "2026-08-01",
        "weightKg": 70.8,
        "heightM": 1.68,
        "imc": 25.1,
        "notes": "Evaluación inicial de ciclo"
      },
      {
        "date": "2026-08-22",
        "weightKg": 69,
        "heightM": 1.68,
        "imc": 24.4,
        "notes": "Progreso notable en resistencia y fuerza"
      }
    ],
    "escuadronId": "Gedeón-8",
    "phase": "2 - Desarrollo",
    "isVipProfile": false,
    "hubConsumption": {
      "snackBar": false,
      "merchandise": false,
      "preventiveMedicine": false
    },
    "avatarUrl": ""
  },
  {
    "id": "std-12",
    "name": "Luciana Peñaranda",
    "phone": "+59172004628",
    "email": "luciana.penaranda@templefit.com",
    "instructorAssigned": "Paulo Alberto Gil Cuellar (Head Coach)",
    "status": "active",
    "plan": "Reto 21 Días",
    "startDate": "2026-08-01",
    "renewalDate": "2026-09-15",
    "birthDate": "2000-01-10",
    "paidServiceTitle": "Reto 21 Días - Transformación Inicial (200 Bs.)",
    "serviceFeeBs": 200,
    "billingCycle": "mensual",
    "paymentStatus": "pagado",
    "amountPaidBs": 200,
    "pendingBalanceBs": 0,
    "lastPaymentDate": "2026-08-05",
    "nextDueDate": "2026-09-01",
    "additionalServices": [
      "Snack Bar Prepago",
      "ElectroHidra"
    ],
    "snackBarBalanceBs": 50,
    "physicalGoal": "Fuerza funcional, calistenia y pérdida de 4kg de grasa",
    "weightKg": 75,
    "heightM": 1.71,
    "workoutLevel": "Avanzado",
    "currentRoutineExercises": "1. Muscle-ups y fondos lastrados (4x6)\n2. Dominadas con agarre supino (4x10)\n3. Pistols asistidos (4x8 p/lado)\n4. Flexiones pliométricas (4x12)\n5. Sparring técnico y Buteyko",
    "nutritionPlan": "Protocolo Salomón + Proteína Limpia",
    "currentDiet": "Desayuno con café y pan, almuerzo irregular, cenas pesadas.",
    "prescribedDiet": "06:00 AM: ElectroHidra 1L. 08:00 AM: Bowl de Elías. Almuerzo anti-inflamatorio con proteína limpia y verduras.",
    "allergiesOrRestrictions": "Ninguna",
    "eatingDisordersOrIssues": "Tendencia a picoteo por estrés en horario laboral",
    "neuroticAndStressFactors": "Tensión cervical por jornadas frente a pantalla y cortisol elevado",
    "spiritualIntention": "Consolidar la disciplina del despertar a las 05:30 AM con oración y enfoque.",
    "mentorshipNotes": "Atleta integrado al escuadrón Cristo-1. Compromiso regular en sesiones CristoFit Camp.",
    "attendanceHistory": [
      {
        "date": "2026-08-20",
        "attended": true,
        "notes": "Sesión CristoFit Camp - 100%"
      },
      {
        "date": "2026-08-22",
        "attended": true,
        "notes": "Entrenamiento de fuerza y calistenia"
      },
      {
        "date": "2026-08-24",
        "attended": true,
        "notes": "Movilidad articular y Buteyko"
      }
    ],
    "assessments": [
      {
        "date": "2026-08-01",
        "weightKg": 76.8,
        "heightM": 1.71,
        "imc": 26.3,
        "notes": "Evaluación inicial de ciclo"
      },
      {
        "date": "2026-08-22",
        "weightKg": 75,
        "heightM": 1.71,
        "imc": 25.6,
        "notes": "Progreso notable en resistencia y fuerza"
      }
    ],
    "escuadronId": "Cristo-1",
    "phase": "3 - Perfeccionamiento",
    "isVipProfile": false,
    "hubConsumption": {
      "snackBar": true,
      "merchandise": true,
      "preventiveMedicine": true
    },
    "avatarUrl": ""
  },
  {
    "id": "std-13",
    "name": "Mauricio Calvimontes",
    "phone": "+59172088347",
    "email": "mauricio.calvimontes@templefit.com",
    "instructorAssigned": "Paulo Alberto Gil Cuellar (Head Coach)",
    "status": "active",
    "plan": "Reto 21 Días",
    "startDate": "2026-08-01",
    "renewalDate": "2026-09-15",
    "birthDate": "2001-02-13",
    "paidServiceTitle": "Reto 21 Días - Transformación Inicial (200 Bs.)",
    "serviceFeeBs": 200,
    "billingCycle": "mensual",
    "paymentStatus": "pagado",
    "amountPaidBs": 200,
    "pendingBalanceBs": 0,
    "lastPaymentDate": "2026-08-05",
    "nextDueDate": "2026-09-01",
    "additionalServices": [
      "Chequeo Antropométrico"
    ],
    "snackBarBalanceBs": 0,
    "physicalGoal": "Composición corporal, masa muscular magra y resistencia",
    "weightKg": 82.5,
    "heightM": 1.74,
    "workoutLevel": "Avanzado",
    "currentRoutineExercises": "1. Flexiones regulares y declinadas (4x15)\n2. Remo invertido en paralelas (4x10)\n3. Estocadas dinámicas (4x12)\n4. Elevación de piernas en barra (4x10)\n5. Cardio CristoFit Camp 06:00 AM",
    "nutritionPlan": "ElectroHidra + Nutrición Anti-inflamatoria",
    "currentDiet": "Comida rápida al mediodía, picoteo dulce por ansiedad en la tarde.",
    "prescribedDiet": "Plan Base Anti-inflamatorio. Snacks de frutos secos y batido verde. Cena ligera antes de las 20:00.",
    "allergiesOrRestrictions": "Ninguna",
    "eatingDisordersOrIssues": "Sin trastornos diagnosticados.",
    "neuroticAndStressFactors": "Manejo de estrés cotidiano.",
    "spiritualIntention": "Superar la pereza mental y liderar con el ejemplo en su hogar y trabajo.",
    "mentorshipNotes": "Atleta integrado al escuadrón Cristo-2. Compromiso regular en sesiones CristoFit Camp.",
    "attendanceHistory": [
      {
        "date": "2026-08-20",
        "attended": true,
        "notes": "Sesión CristoFit Camp - 100%"
      },
      {
        "date": "2026-08-22",
        "attended": true,
        "notes": "Entrenamiento de fuerza y calistenia"
      },
      {
        "date": "2026-08-24",
        "attended": true,
        "notes": "Movilidad articular y Buteyko"
      }
    ],
    "assessments": [
      {
        "date": "2026-08-01",
        "weightKg": 84.3,
        "heightM": 1.74,
        "imc": 27.8,
        "notes": "Evaluación inicial de ciclo"
      },
      {
        "date": "2026-08-22",
        "weightKg": 82.5,
        "heightM": 1.74,
        "imc": 27.2,
        "notes": "Progreso notable en resistencia y fuerza"
      }
    ],
    "escuadronId": "Cristo-2",
    "phase": "3 - Perfeccionamiento",
    "isVipProfile": false,
    "hubConsumption": {
      "snackBar": false,
      "merchandise": false,
      "preventiveMedicine": false
    },
    "avatarUrl": ""
  },
  {
    "id": "std-14",
    "name": "Sofia Banzer",
    "phone": "+59172172066",
    "email": "sofia.banzer@templefit.com",
    "instructorAssigned": "Paulo Alberto Gil Cuellar (Head Coach)",
    "status": "active",
    "plan": "Reto 21 Días",
    "startDate": "2026-08-01",
    "renewalDate": "2026-09-15",
    "birthDate": "2002-03-16",
    "paidServiceTitle": "Reto 21 Días - Transformación Inicial (200 Bs.)",
    "serviceFeeBs": 200,
    "billingCycle": "mensual",
    "paymentStatus": "parcial",
    "amountPaidBs": 100,
    "pendingBalanceBs": 100,
    "lastPaymentDate": "2026-08-05",
    "nextDueDate": "2026-09-01",
    "additionalServices": [
      "Snack Bar Prepago",
      "ElectroHidra"
    ],
    "snackBarBalanceBs": 0,
    "physicalGoal": "Fuerza funcional, calistenia y pérdida de 4kg de grasa",
    "weightKg": 58,
    "heightM": 1.77,
    "workoutLevel": "Avanzado",
    "currentRoutineExercises": "1. Trabajo de core y estabilidad lumbar\n2. Flexiones hindúes y pike pushups (4x10)\n3. Saltos de cuerda (5 rondas x 2 min)\n4. Dominadas escapulares (4x12)\n5. Hidratación con ElectroHidra",
    "nutritionPlan": "Catering Saludable Abuela Fit + Hidratación Activa",
    "currentDiet": "Dieta hipercalórica desordenada, bajo consumo de agua.",
    "prescribedDiet": "Catering Abuela Fit + 3L de agua alcalina con electrolitos naturales. Suplemento con glutamina.",
    "allergiesOrRestrictions": "Ninguna",
    "eatingDisordersOrIssues": "Sin trastornos diagnosticados.",
    "neuroticAndStressFactors": "Manejo de estrés cotidiano.",
    "spiritualIntention": "Buscar paz interior frente al estrés laboral mediante devocionales y Buteyko.",
    "mentorshipNotes": "Atleta integrado al escuadrón Cristo-3. Compromiso regular en sesiones CristoFit Camp.",
    "attendanceHistory": [
      {
        "date": "2026-08-20",
        "attended": true,
        "notes": "Sesión CristoFit Camp - 100%"
      },
      {
        "date": "2026-08-22",
        "attended": true,
        "notes": "Entrenamiento de fuerza y calistenia"
      },
      {
        "date": "2026-08-24",
        "attended": true,
        "notes": "Movilidad articular y Buteyko"
      }
    ],
    "assessments": [
      {
        "date": "2026-08-01",
        "weightKg": 59.8,
        "heightM": 1.77,
        "imc": 19.1,
        "notes": "Evaluación inicial de ciclo"
      },
      {
        "date": "2026-08-22",
        "weightKg": 58,
        "heightM": 1.77,
        "imc": 18.5,
        "notes": "Progreso notable en resistencia y fuerza"
      }
    ],
    "escuadronId": "Cristo-3",
    "phase": "3 - Perfeccionamiento",
    "isVipProfile": false,
    "hubConsumption": {
      "snackBar": true,
      "merchandise": false,
      "preventiveMedicine": false
    },
    "avatarUrl": ""
  },
  {
    "id": "std-15",
    "name": "Javier Justiniano",
    "phone": "+59172255785",
    "email": "javier.justiniano@templefit.com",
    "instructorAssigned": "Paulo Alberto Gil Cuellar (Head Coach)",
    "status": "active",
    "plan": "Reto 21 Días",
    "startDate": "2026-08-01",
    "renewalDate": "2026-09-15",
    "birthDate": "1988-04-19",
    "paidServiceTitle": "Reto 21 Días - Transformación Inicial (200 Bs.)",
    "serviceFeeBs": 200,
    "billingCycle": "mensual",
    "paymentStatus": "pagado",
    "amountPaidBs": 200,
    "pendingBalanceBs": 0,
    "lastPaymentDate": "2026-08-05",
    "nextDueDate": "2026-09-01",
    "additionalServices": [
      "Chequeo Antropométrico"
    ],
    "snackBarBalanceBs": 50,
    "physicalGoal": "Composición corporal, masa muscular magra y resistencia",
    "weightKg": 64,
    "heightM": 1.8,
    "workoutLevel": "Avanzado",
    "currentRoutineExercises": "1. Dominadas estrictas (4x8)\n2. Fondos en paralelas (4x10)\n3. Sentadilla búlgara (4x12)\n4. Flexiones diamante (4x15)\n5. Buteyko y cardio matutino 06:00 AM",
    "nutritionPlan": "Smoothie de Salomón + Plan Detox 0 Azúcar",
    "currentDiet": "Salteo de comidas, exceso de gaseosas y azúcar refinada.",
    "prescribedDiet": "Detox 21 Días sin azúcar. Smoothie de Salomón matutino, ensaladas verdes y pescado fresco.",
    "allergiesOrRestrictions": "Sensibilidad a la lactosa",
    "eatingDisordersOrIssues": "Sin trastornos diagnosticados.",
    "neuroticAndStressFactors": "Tensión cervical por jornadas frente a pantalla y cortisol elevado",
    "spiritualIntention": "Liderar su escuadrón con humildad, servicio y constancia innegociable.",
    "mentorshipNotes": "Atleta integrado al escuadrón Cristo-4. Compromiso regular en sesiones CristoFit Camp.",
    "attendanceHistory": [
      {
        "date": "2026-08-20",
        "attended": true,
        "notes": "Sesión CristoFit Camp - 100%"
      },
      {
        "date": "2026-08-22",
        "attended": true,
        "notes": "Entrenamiento de fuerza y calistenia"
      },
      {
        "date": "2026-08-24",
        "attended": true,
        "notes": "Movilidad articular y Buteyko"
      }
    ],
    "assessments": [
      {
        "date": "2026-08-01",
        "weightKg": 65.8,
        "heightM": 1.8,
        "imc": 20.3,
        "notes": "Evaluación inicial de ciclo"
      },
      {
        "date": "2026-08-22",
        "weightKg": 64,
        "heightM": 1.8,
        "imc": 19.8,
        "notes": "Progreso notable en resistencia y fuerza"
      }
    ],
    "escuadronId": "Cristo-4",
    "phase": "3 - Perfeccionamiento",
    "isVipProfile": false,
    "hubConsumption": {
      "snackBar": false,
      "merchandise": true,
      "preventiveMedicine": false
    },
    "avatarUrl": ""
  },
  {
    "id": "std-16",
    "name": "Natalia Aguilera",
    "phone": "+59172339504",
    "email": "natalia.aguilera@templefit.com",
    "instructorAssigned": "Paulo Alberto Gil Cuellar (Head Coach)",
    "status": "active",
    "plan": "Reto 21 Días",
    "startDate": "2026-08-01",
    "renewalDate": "2026-09-15",
    "birthDate": "1989-05-22",
    "paidServiceTitle": "Reto 21 Días - Transformación Inicial (200 Bs.)",
    "serviceFeeBs": 200,
    "billingCycle": "mensual",
    "paymentStatus": "pagado",
    "amountPaidBs": 200,
    "pendingBalanceBs": 0,
    "lastPaymentDate": "2026-08-05",
    "nextDueDate": "2026-09-01",
    "additionalServices": [
      "Snack Bar Prepago",
      "ElectroHidra"
    ],
    "snackBarBalanceBs": 0,
    "physicalGoal": "Fuerza funcional, calistenia y pérdida de 4kg de grasa",
    "weightKg": 71.5,
    "heightM": 1.83,
    "workoutLevel": "Avanzado",
    "currentRoutineExercises": "1. Calistenia funcional básica y movilidad\n2. Sentadillas con peso corporal (4x15)\n3. Flexiones en barra inclinada (4x10)\n4. Planchas isométricas (4x45s)\n5. Caminata activa y respiración nasal",
    "nutritionPlan": "Protocolo Salomón + Proteína Limpia",
    "currentDiet": "Desayuno con café y pan, almuerzo irregular, cenas pesadas.",
    "prescribedDiet": "06:00 AM: ElectroHidra 1L. 08:00 AM: Bowl de Elías. Almuerzo anti-inflamatorio con proteína limpia y verduras.",
    "allergiesOrRestrictions": "Ninguna",
    "eatingDisordersOrIssues": "Tendencia a picoteo por estrés en horario laboral",
    "neuroticAndStressFactors": "Manejo de estrés cotidiano.",
    "spiritualIntention": "Alinear cuerpo, mente y espíritu como templo del Creador (1 Corintios 6:19).",
    "mentorshipNotes": "Atleta integrado al escuadrón Cristo-5. Compromiso regular en sesiones CristoFit Camp.",
    "attendanceHistory": [
      {
        "date": "2026-08-20",
        "attended": true,
        "notes": "Sesión CristoFit Camp - 100%"
      },
      {
        "date": "2026-08-22",
        "attended": true,
        "notes": "Entrenamiento de fuerza y calistenia"
      },
      {
        "date": "2026-08-24",
        "attended": true,
        "notes": "Movilidad articular y Buteyko"
      }
    ],
    "assessments": [
      {
        "date": "2026-08-01",
        "weightKg": 73.3,
        "heightM": 1.83,
        "imc": 21.9,
        "notes": "Evaluación inicial de ciclo"
      },
      {
        "date": "2026-08-22",
        "weightKg": 71.5,
        "heightM": 1.83,
        "imc": 21.4,
        "notes": "Progreso notable en resistencia y fuerza"
      }
    ],
    "escuadronId": "Cristo-5",
    "phase": "3 - Perfeccionamiento",
    "isVipProfile": false,
    "hubConsumption": {
      "snackBar": true,
      "merchandise": false,
      "preventiveMedicine": true
    },
    "avatarUrl": ""
  },
  {
    "id": "std-17",
    "name": "Mateo Saucedo",
    "phone": "+59172423223",
    "email": "mateo.saucedo@templefit.com",
    "instructorAssigned": "Paulo Alberto Gil Cuellar (Head Coach)",
    "status": "active",
    "plan": "Reto 21 Días",
    "startDate": "2026-08-01",
    "renewalDate": "2026-09-15",
    "birthDate": "1990-06-25",
    "paidServiceTitle": "Reto 21 Días - Transformación Inicial (200 Bs.)",
    "serviceFeeBs": 200,
    "billingCycle": "mensual",
    "paymentStatus": "pagado",
    "amountPaidBs": 200,
    "pendingBalanceBs": 0,
    "lastPaymentDate": "2026-08-05",
    "nextDueDate": "2026-09-01",
    "additionalServices": [
      "Chequeo Antropométrico"
    ],
    "snackBarBalanceBs": 0,
    "physicalGoal": "Composición corporal, masa muscular magra y resistencia",
    "weightKg": 79,
    "heightM": 1.61,
    "workoutLevel": "Avanzado",
    "currentRoutineExercises": "1. Muscle-ups y fondos lastrados (4x6)\n2. Dominadas con agarre supino (4x10)\n3. Pistols asistidos (4x8 p/lado)\n4. Flexiones pliométricas (4x12)\n5. Sparring técnico y Buteyko",
    "nutritionPlan": "ElectroHidra + Nutrición Anti-inflamatoria",
    "currentDiet": "Comida rápida al mediodía, picoteo dulce por ansiedad en la tarde.",
    "prescribedDiet": "Plan Base Anti-inflamatorio. Snacks de frutos secos y batido verde. Cena ligera antes de las 20:00.",
    "allergiesOrRestrictions": "Ninguna",
    "eatingDisordersOrIssues": "Sin trastornos diagnosticados.",
    "neuroticAndStressFactors": "Manejo de estrés cotidiano.",
    "spiritualIntention": "Cultivar autodominio y templanza en momentos de alta presión profesional.",
    "mentorshipNotes": "Atleta integrado al escuadrón Cristo-6. Compromiso regular en sesiones CristoFit Camp.",
    "attendanceHistory": [
      {
        "date": "2026-08-20",
        "attended": true,
        "notes": "Sesión CristoFit Camp - 100%"
      },
      {
        "date": "2026-08-22",
        "attended": true,
        "notes": "Entrenamiento de fuerza y calistenia"
      },
      {
        "date": "2026-08-24",
        "attended": true,
        "notes": "Movilidad articular y Buteyko"
      }
    ],
    "assessments": [
      {
        "date": "2026-08-01",
        "weightKg": 80.8,
        "heightM": 1.61,
        "imc": 31.2,
        "notes": "Evaluación inicial de ciclo"
      },
      {
        "date": "2026-08-22",
        "weightKg": 79,
        "heightM": 1.61,
        "imc": 30.5,
        "notes": "Progreso notable en resistencia y fuerza"
      }
    ],
    "escuadronId": "Cristo-6",
    "phase": "3 - Perfeccionamiento",
    "isVipProfile": false,
    "hubConsumption": {
      "snackBar": false,
      "merchandise": false,
      "preventiveMedicine": false
    },
    "avatarUrl": ""
  },
  {
    "id": "std-18",
    "name": "Isabella Hurtado",
    "phone": "+59172506942",
    "email": "isabella.hurtado@templefit.com",
    "instructorAssigned": "Paulo Alberto Gil Cuellar (Head Coach)",
    "status": "active",
    "plan": "Reto 21 Días",
    "startDate": "2026-08-01",
    "renewalDate": "2026-09-15",
    "birthDate": "1991-07-01",
    "paidServiceTitle": "Reto 21 Días - Transformación Inicial (200 Bs.)",
    "serviceFeeBs": 200,
    "billingCycle": "mensual",
    "paymentStatus": "pagado",
    "amountPaidBs": 200,
    "pendingBalanceBs": 0,
    "lastPaymentDate": "2026-08-05",
    "nextDueDate": "2026-09-01",
    "additionalServices": [
      "Snack Bar Prepago",
      "ElectroHidra"
    ],
    "snackBarBalanceBs": 50,
    "physicalGoal": "Fuerza funcional, calistenia y pérdida de 4kg de grasa",
    "weightKg": 85,
    "heightM": 1.64,
    "workoutLevel": "Avanzado",
    "currentRoutineExercises": "1. Flexiones regulares y declinadas (4x15)\n2. Remo invertido en paralelas (4x10)\n3. Estocadas dinámicas (4x12)\n4. Elevación de piernas en barra (4x10)\n5. Cardio CristoFit Camp 06:00 AM",
    "nutritionPlan": "Catering Saludable Abuela Fit + Hidratación Activa",
    "currentDiet": "Dieta hipercalórica desordenada, bajo consumo de agua.",
    "prescribedDiet": "Catering Abuela Fit + 3L de agua alcalina con electrolitos naturales. Suplemento con glutamina.",
    "allergiesOrRestrictions": "Ninguna",
    "eatingDisordersOrIssues": "Sin trastornos diagnosticados.",
    "neuroticAndStressFactors": "Tensión cervical por jornadas frente a pantalla y cortisol elevado",
    "spiritualIntention": "Consolidar la disciplina del despertar a las 05:30 AM con oración y enfoque.",
    "mentorshipNotes": "Atleta integrado al escuadrón Cristo-7. Compromiso regular en sesiones CristoFit Camp.",
    "attendanceHistory": [
      {
        "date": "2026-08-20",
        "attended": true,
        "notes": "Sesión CristoFit Camp - 100%"
      },
      {
        "date": "2026-08-22",
        "attended": true,
        "notes": "Entrenamiento de fuerza y calistenia"
      },
      {
        "date": "2026-08-24",
        "attended": true,
        "notes": "Movilidad articular y Buteyko"
      }
    ],
    "assessments": [
      {
        "date": "2026-08-01",
        "weightKg": 86.8,
        "heightM": 1.64,
        "imc": 32.3,
        "notes": "Evaluación inicial de ciclo"
      },
      {
        "date": "2026-08-22",
        "weightKg": 85,
        "heightM": 1.64,
        "imc": 31.6,
        "notes": "Progreso notable en resistencia y fuerza"
      }
    ],
    "escuadronId": "Cristo-7",
    "phase": "3 - Perfeccionamiento",
    "isVipProfile": false,
    "hubConsumption": {
      "snackBar": true,
      "merchandise": true,
      "preventiveMedicine": false
    },
    "avatarUrl": ""
  },
  {
    "id": "std-19",
    "name": "Sebastián Pinto",
    "phone": "+59172590661",
    "email": "sebastian.pinto@templefit.com",
    "instructorAssigned": "Paulo Alberto Gil Cuellar (Head Coach)",
    "status": "expiring",
    "plan": "Reto 21 Días",
    "startDate": "2026-08-01",
    "renewalDate": "2026-08-28",
    "birthDate": "1992-08-04",
    "paidServiceTitle": "Reto 21 Días - Transformación Inicial (200 Bs.)",
    "serviceFeeBs": 200,
    "billingCycle": "mensual",
    "paymentStatus": "pendiente",
    "amountPaidBs": 0,
    "pendingBalanceBs": 200,
    "lastPaymentDate": "",
    "nextDueDate": "2026-09-01",
    "additionalServices": [
      "Chequeo Antropométrico"
    ],
    "snackBarBalanceBs": 0,
    "physicalGoal": "Composición corporal, masa muscular magra y resistencia",
    "weightKg": 60.5,
    "heightM": 1.67,
    "workoutLevel": "Avanzado",
    "currentRoutineExercises": "1. Trabajo de core y estabilidad lumbar\n2. Flexiones hindúes y pike pushups (4x10)\n3. Saltos de cuerda (5 rondas x 2 min)\n4. Dominadas escapulares (4x12)\n5. Hidratación con ElectroHidra",
    "nutritionPlan": "Smoothie de Salomón + Plan Detox 0 Azúcar",
    "currentDiet": "Salteo de comidas, exceso de gaseosas y azúcar refinada.",
    "prescribedDiet": "Detox 21 Días sin azúcar. Smoothie de Salomón matutino, ensaladas verdes y pescado fresco.",
    "allergiesOrRestrictions": "Ninguna",
    "eatingDisordersOrIssues": "Sin trastornos diagnosticados.",
    "neuroticAndStressFactors": "Manejo de estrés cotidiano.",
    "spiritualIntention": "Superar la pereza mental y liderar con el ejemplo en su hogar y trabajo.",
    "mentorshipNotes": "Atleta integrado al escuadrón Cristo-8. Compromiso regular en sesiones CristoFit Camp.",
    "attendanceHistory": [
      {
        "date": "2026-08-20",
        "attended": true,
        "notes": "Sesión CristoFit Camp - 100%"
      },
      {
        "date": "2026-08-22",
        "attended": true,
        "notes": "Entrenamiento de fuerza y calistenia"
      },
      {
        "date": "2026-08-24",
        "attended": true,
        "notes": "Movilidad articular y Buteyko"
      }
    ],
    "assessments": [
      {
        "date": "2026-08-01",
        "weightKg": 62.3,
        "heightM": 1.67,
        "imc": 22.3,
        "notes": "Evaluación inicial de ciclo"
      },
      {
        "date": "2026-08-22",
        "weightKg": 60.5,
        "heightM": 1.67,
        "imc": 21.7,
        "notes": "Progreso notable en resistencia y fuerza"
      }
    ],
    "escuadronId": "Cristo-8",
    "phase": "3 - Perfeccionamiento",
    "isVipProfile": false,
    "hubConsumption": {
      "snackBar": false,
      "merchandise": false,
      "preventiveMedicine": false
    },
    "avatarUrl": ""
  },
  {
    "id": "std-20",
    "name": "Renata Claros",
    "phone": "+59172674380",
    "email": "renata.claros@templefit.com",
    "instructorAssigned": "Paulo Alberto Gil Cuellar (Head Coach)",
    "status": "active",
    "plan": "Reto 21 Días",
    "startDate": "2026-08-01",
    "renewalDate": "2026-09-15",
    "birthDate": "1993-09-07",
    "paidServiceTitle": "Reto 21 Días - Transformación Inicial (200 Bs.)",
    "serviceFeeBs": 200,
    "billingCycle": "mensual",
    "paymentStatus": "pagado",
    "amountPaidBs": 200,
    "pendingBalanceBs": 0,
    "lastPaymentDate": "2026-08-05",
    "nextDueDate": "2026-09-01",
    "additionalServices": [
      "Snack Bar Prepago",
      "ElectroHidra"
    ],
    "snackBarBalanceBs": 0,
    "physicalGoal": "Fuerza funcional, calistenia y pérdida de 4kg de grasa",
    "weightKg": 68,
    "heightM": 1.7,
    "workoutLevel": "Principiante",
    "currentRoutineExercises": "1. Dominadas estrictas (4x8)\n2. Fondos en paralelas (4x10)\n3. Sentadilla búlgara (4x12)\n4. Flexiones diamante (4x15)\n5. Buteyko y cardio matutino 06:00 AM",
    "nutritionPlan": "Protocolo Salomón + Proteína Limpia",
    "currentDiet": "Desayuno con café y pan, almuerzo irregular, cenas pesadas.",
    "prescribedDiet": "06:00 AM: ElectroHidra 1L. 08:00 AM: Bowl de Elías. Almuerzo anti-inflamatorio con proteína limpia y verduras.",
    "allergiesOrRestrictions": "Sensibilidad a la lactosa",
    "eatingDisordersOrIssues": "Tendencia a picoteo por estrés en horario laboral",
    "neuroticAndStressFactors": "Manejo de estrés cotidiano.",
    "spiritualIntention": "Buscar paz interior frente al estrés laboral mediante devocionales y Buteyko.",
    "mentorshipNotes": "Atleta integrado al escuadrón Paz-Alfa. Compromiso regular en sesiones CristoFit Camp.",
    "attendanceHistory": [
      {
        "date": "2026-08-20",
        "attended": true,
        "notes": "Sesión CristoFit Camp - 100%"
      },
      {
        "date": "2026-08-22",
        "attended": true,
        "notes": "Entrenamiento de fuerza y calistenia"
      },
      {
        "date": "2026-08-24",
        "attended": true,
        "notes": "Movilidad articular y Buteyko"
      }
    ],
    "assessments": [
      {
        "date": "2026-08-01",
        "weightKg": 69.8,
        "heightM": 1.7,
        "imc": 24.2,
        "notes": "Evaluación inicial de ciclo"
      },
      {
        "date": "2026-08-22",
        "weightKg": 68,
        "heightM": 1.7,
        "imc": 23.5,
        "notes": "Progreso notable en resistencia y fuerza"
      }
    ],
    "escuadronId": "Paz-Alfa",
    "phase": "1 - Iniciación",
    "isVipProfile": false,
    "hubConsumption": {
      "snackBar": true,
      "merchandise": false,
      "preventiveMedicine": true
    },
    "avatarUrl": ""
  },
  {
    "id": "std-21",
    "name": "Nicolás Antelo",
    "phone": "+59172758099",
    "email": "nicolas.antelo@templefit.com",
    "instructorAssigned": "Paulo Alberto Gil Cuellar (Head Coach)",
    "status": "active",
    "plan": "Reto 21 Días",
    "startDate": "2026-08-01",
    "renewalDate": "2026-09-15",
    "birthDate": "1994-10-10",
    "paidServiceTitle": "Reto 21 Días - Transformación Inicial (200 Bs.)",
    "serviceFeeBs": 200,
    "billingCycle": "mensual",
    "paymentStatus": "pagado",
    "amountPaidBs": 200,
    "pendingBalanceBs": 0,
    "lastPaymentDate": "2026-08-05",
    "nextDueDate": "2026-09-01",
    "additionalServices": [
      "Chequeo Antropométrico"
    ],
    "snackBarBalanceBs": 50,
    "physicalGoal": "Composición corporal, masa muscular magra y resistencia",
    "weightKg": 74,
    "heightM": 1.73,
    "workoutLevel": "Principiante",
    "currentRoutineExercises": "1. Calistenia funcional básica y movilidad\n2. Sentadillas con peso corporal (4x15)\n3. Flexiones en barra inclinada (4x10)\n4. Planchas isométricas (4x45s)\n5. Caminata activa y respiración nasal",
    "nutritionPlan": "ElectroHidra + Nutrición Anti-inflamatoria",
    "currentDiet": "Comida rápida al mediodía, picoteo dulce por ansiedad en la tarde.",
    "prescribedDiet": "Plan Base Anti-inflamatorio. Snacks de frutos secos y batido verde. Cena ligera antes de las 20:00.",
    "allergiesOrRestrictions": "Ninguna",
    "eatingDisordersOrIssues": "Sin trastornos diagnosticados.",
    "neuroticAndStressFactors": "Tensión cervical por jornadas frente a pantalla y cortisol elevado",
    "spiritualIntention": "Liderar su escuadrón con humildad, servicio y constancia innegociable.",
    "mentorshipNotes": "Atleta integrado al escuadrón Paz-Beta. Compromiso regular en sesiones CristoFit Camp.",
    "attendanceHistory": [
      {
        "date": "2026-08-20",
        "attended": true,
        "notes": "Sesión CristoFit Camp - 100%"
      },
      {
        "date": "2026-08-22",
        "attended": true,
        "notes": "Entrenamiento de fuerza y calistenia"
      },
      {
        "date": "2026-08-24",
        "attended": true,
        "notes": "Movilidad articular y Buteyko"
      }
    ],
    "assessments": [
      {
        "date": "2026-08-01",
        "weightKg": 75.8,
        "heightM": 1.73,
        "imc": 25.3,
        "notes": "Evaluación inicial de ciclo"
      },
      {
        "date": "2026-08-22",
        "weightKg": 74,
        "heightM": 1.73,
        "imc": 24.7,
        "notes": "Progreso notable en resistencia y fuerza"
      }
    ],
    "escuadronId": "Paz-Beta",
    "phase": "1 - Iniciación",
    "isVipProfile": false,
    "hubConsumption": {
      "snackBar": false,
      "merchandise": true,
      "preventiveMedicine": false
    },
    "avatarUrl": ""
  },
  {
    "id": "std-22",
    "name": "Paola Vaca",
    "phone": "+59172841818",
    "email": "paola.vaca@templefit.com",
    "instructorAssigned": "Paulo Alberto Gil Cuellar (Head Coach)",
    "status": "active",
    "plan": "Reto 21 Días",
    "startDate": "2026-08-01",
    "renewalDate": "2026-09-15",
    "birthDate": "1995-11-13",
    "paidServiceTitle": "Reto 21 Días - Transformación Inicial (200 Bs.)",
    "serviceFeeBs": 200,
    "billingCycle": "mensual",
    "paymentStatus": "pagado",
    "amountPaidBs": 200,
    "pendingBalanceBs": 0,
    "lastPaymentDate": "2026-08-05",
    "nextDueDate": "2026-09-01",
    "additionalServices": [
      "Snack Bar Prepago",
      "ElectroHidra"
    ],
    "snackBarBalanceBs": 0,
    "physicalGoal": "Fuerza funcional, calistenia y pérdida de 4kg de grasa",
    "weightKg": 81.5,
    "heightM": 1.76,
    "workoutLevel": "Principiante",
    "currentRoutineExercises": "1. Muscle-ups y fondos lastrados (4x6)\n2. Dominadas con agarre supino (4x10)\n3. Pistols asistidos (4x8 p/lado)\n4. Flexiones pliométricas (4x12)\n5. Sparring técnico y Buteyko",
    "nutritionPlan": "Catering Saludable Abuela Fit + Hidratación Activa",
    "currentDiet": "Dieta hipercalórica desordenada, bajo consumo de agua.",
    "prescribedDiet": "Catering Abuela Fit + 3L de agua alcalina con electrolitos naturales. Suplemento con glutamina.",
    "allergiesOrRestrictions": "Ninguna",
    "eatingDisordersOrIssues": "Sin trastornos diagnosticados.",
    "neuroticAndStressFactors": "Manejo de estrés cotidiano.",
    "spiritualIntention": "Alinear cuerpo, mente y espíritu como templo del Creador (1 Corintios 6:19).",
    "mentorshipNotes": "Atleta integrado al escuadrón Paz-Gamma. Compromiso regular en sesiones CristoFit Camp.",
    "attendanceHistory": [
      {
        "date": "2026-08-20",
        "attended": true,
        "notes": "Sesión CristoFit Camp - 100%"
      },
      {
        "date": "2026-08-22",
        "attended": true,
        "notes": "Entrenamiento de fuerza y calistenia"
      },
      {
        "date": "2026-08-24",
        "attended": true,
        "notes": "Movilidad articular y Buteyko"
      }
    ],
    "assessments": [
      {
        "date": "2026-08-01",
        "weightKg": 83.3,
        "heightM": 1.76,
        "imc": 26.9,
        "notes": "Evaluación inicial de ciclo"
      },
      {
        "date": "2026-08-22",
        "weightKg": 81.5,
        "heightM": 1.76,
        "imc": 26.3,
        "notes": "Progreso notable en resistencia y fuerza"
      }
    ],
    "escuadronId": "Paz-Gamma",
    "phase": "1 - Iniciación",
    "isVipProfile": false,
    "hubConsumption": {
      "snackBar": true,
      "merchandise": false,
      "preventiveMedicine": false
    },
    "avatarUrl": ""
  },
  {
    "id": "std-23",
    "name": "Ignacio Ribera",
    "phone": "+59172925537",
    "email": "ignacio.ribera@templefit.com",
    "instructorAssigned": "Paulo Alberto Gil Cuellar (Head Coach)",
    "status": "active",
    "plan": "Reto 21 Días",
    "startDate": "2026-08-01",
    "renewalDate": "2026-09-15",
    "birthDate": "1996-12-16",
    "paidServiceTitle": "Reto 21 Días - Transformación Inicial (200 Bs.)",
    "serviceFeeBs": 200,
    "billingCycle": "mensual",
    "paymentStatus": "pagado",
    "amountPaidBs": 200,
    "pendingBalanceBs": 0,
    "lastPaymentDate": "2026-08-05",
    "nextDueDate": "2026-09-01",
    "additionalServices": [
      "Chequeo Antropométrico"
    ],
    "snackBarBalanceBs": 0,
    "physicalGoal": "Composición corporal, masa muscular magra y resistencia",
    "weightKg": 57,
    "heightM": 1.79,
    "workoutLevel": "Principiante",
    "currentRoutineExercises": "1. Flexiones regulares y declinadas (4x15)\n2. Remo invertido en paralelas (4x10)\n3. Estocadas dinámicas (4x12)\n4. Elevación de piernas en barra (4x10)\n5. Cardio CristoFit Camp 06:00 AM",
    "nutritionPlan": "Smoothie de Salomón + Plan Detox 0 Azúcar",
    "currentDiet": "Salteo de comidas, exceso de gaseosas y azúcar refinada.",
    "prescribedDiet": "Detox 21 Días sin azúcar. Smoothie de Salomón matutino, ensaladas verdes y pescado fresco.",
    "allergiesOrRestrictions": "Ninguna",
    "eatingDisordersOrIssues": "Sin trastornos diagnosticados.",
    "neuroticAndStressFactors": "Manejo de estrés cotidiano.",
    "spiritualIntention": "Cultivar autodominio y templanza en momentos de alta presión profesional.",
    "mentorshipNotes": "Atleta integrado al escuadrón Paz-Delta. Compromiso regular en sesiones CristoFit Camp.",
    "attendanceHistory": [
      {
        "date": "2026-08-20",
        "attended": true,
        "notes": "Sesión CristoFit Camp - 100%"
      },
      {
        "date": "2026-08-22",
        "attended": true,
        "notes": "Entrenamiento de fuerza y calistenia"
      },
      {
        "date": "2026-08-24",
        "attended": true,
        "notes": "Movilidad articular y Buteyko"
      }
    ],
    "assessments": [
      {
        "date": "2026-08-01",
        "weightKg": 58.8,
        "heightM": 1.79,
        "imc": 18.4,
        "notes": "Evaluación inicial de ciclo"
      },
      {
        "date": "2026-08-22",
        "weightKg": 57,
        "heightM": 1.79,
        "imc": 17.8,
        "notes": "Progreso notable en resistencia y fuerza"
      }
    ],
    "escuadronId": "Paz-Delta",
    "phase": "1 - Iniciación",
    "isVipProfile": false,
    "hubConsumption": {
      "snackBar": false,
      "merchandise": false,
      "preventiveMedicine": false
    },
    "avatarUrl": ""
  },
  {
    "id": "std-24",
    "name": "Juliana Morales",
    "phone": "+59173009256",
    "email": "juliana.morales@templefit.com",
    "instructorAssigned": "Paulo Alberto Gil Cuellar (Head Coach)",
    "status": "active",
    "plan": "Reto 21 Días",
    "startDate": "2026-08-01",
    "renewalDate": "2026-09-15",
    "birthDate": "1997-01-19",
    "paidServiceTitle": "Reto 21 Días - Transformación Inicial (200 Bs.)",
    "serviceFeeBs": 200,
    "billingCycle": "mensual",
    "paymentStatus": "pagado",
    "amountPaidBs": 200,
    "pendingBalanceBs": 0,
    "lastPaymentDate": "2026-08-05",
    "nextDueDate": "2026-09-01",
    "additionalServices": [
      "Snack Bar Prepago",
      "ElectroHidra"
    ],
    "snackBarBalanceBs": 50,
    "physicalGoal": "Fuerza funcional, calistenia y pérdida de 4kg de grasa",
    "weightKg": 63,
    "heightM": 1.82,
    "workoutLevel": "Intermedio",
    "currentRoutineExercises": "1. Trabajo de core y estabilidad lumbar\n2. Flexiones hindúes y pike pushups (4x10)\n3. Saltos de cuerda (5 rondas x 2 min)\n4. Dominadas escapulares (4x12)\n5. Hidratación con ElectroHidra",
    "nutritionPlan": "Protocolo Salomón + Proteína Limpia",
    "currentDiet": "Desayuno con café y pan, almuerzo irregular, cenas pesadas.",
    "prescribedDiet": "06:00 AM: ElectroHidra 1L. 08:00 AM: Bowl de Elías. Almuerzo anti-inflamatorio con proteína limpia y verduras.",
    "allergiesOrRestrictions": "Ninguna",
    "eatingDisordersOrIssues": "Tendencia a picoteo por estrés en horario laboral",
    "neuroticAndStressFactors": "Tensión cervical por jornadas frente a pantalla y cortisol elevado",
    "spiritualIntention": "Consolidar la disciplina del despertar a las 05:30 AM con oración y enfoque.",
    "mentorshipNotes": "Atleta integrado al escuadrón Gedeón-1. Compromiso regular en sesiones CristoFit Camp.",
    "attendanceHistory": [
      {
        "date": "2026-08-20",
        "attended": true,
        "notes": "Sesión CristoFit Camp - 100%"
      },
      {
        "date": "2026-08-22",
        "attended": true,
        "notes": "Entrenamiento de fuerza y calistenia"
      },
      {
        "date": "2026-08-24",
        "attended": true,
        "notes": "Movilidad articular y Buteyko"
      }
    ],
    "assessments": [
      {
        "date": "2026-08-01",
        "weightKg": 64.8,
        "heightM": 1.82,
        "imc": 19.6,
        "notes": "Evaluación inicial de ciclo"
      },
      {
        "date": "2026-08-22",
        "weightKg": 63,
        "heightM": 1.82,
        "imc": 19,
        "notes": "Progreso notable en resistencia y fuerza"
      }
    ],
    "escuadronId": "Gedeón-1",
    "phase": "2 - Desarrollo",
    "isVipProfile": false,
    "hubConsumption": {
      "snackBar": true,
      "merchandise": true,
      "preventiveMedicine": true
    },
    "avatarUrl": ""
  },
  {
    "id": "std-25",
    "name": "Álvaro Terrazas",
    "phone": "+59173092975",
    "email": "alvaro.terrazas@templefit.com",
    "instructorAssigned": "Paulo Alberto Gil Cuellar (Head Coach)",
    "status": "active",
    "plan": "Membresía Mensual",
    "startDate": "2026-08-01",
    "renewalDate": "2026-09-15",
    "birthDate": "1998-02-22",
    "paidServiceTitle": "Membresía Mensual Atleta (200 Bs.)",
    "serviceFeeBs": 200,
    "billingCycle": "mensual",
    "paymentStatus": "pagado",
    "amountPaidBs": 200,
    "pendingBalanceBs": 0,
    "lastPaymentDate": "2026-08-05",
    "nextDueDate": "2026-09-01",
    "additionalServices": [
      "Chequeo Antropométrico"
    ],
    "snackBarBalanceBs": 0,
    "physicalGoal": "Composición corporal, masa muscular magra y resistencia",
    "weightKg": 70.5,
    "heightM": 1.6,
    "workoutLevel": "Intermedio",
    "currentRoutineExercises": "1. Dominadas estrictas (4x8)\n2. Fondos en paralelas (4x10)\n3. Sentadilla búlgara (4x12)\n4. Flexiones diamante (4x15)\n5. Buteyko y cardio matutino 06:00 AM",
    "nutritionPlan": "ElectroHidra + Nutrición Anti-inflamatoria",
    "currentDiet": "Comida rápida al mediodía, picoteo dulce por ansiedad en la tarde.",
    "prescribedDiet": "Plan Base Anti-inflamatorio. Snacks de frutos secos y batido verde. Cena ligera antes de las 20:00.",
    "allergiesOrRestrictions": "Sensibilidad a la lactosa",
    "eatingDisordersOrIssues": "Sin trastornos diagnosticados.",
    "neuroticAndStressFactors": "Manejo de estrés cotidiano.",
    "spiritualIntention": "Superar la pereza mental y liderar con el ejemplo en su hogar y trabajo.",
    "mentorshipNotes": "Atleta integrado al escuadrón Gedeón-2. Compromiso regular en sesiones CristoFit Camp.",
    "attendanceHistory": [
      {
        "date": "2026-08-20",
        "attended": true,
        "notes": "Sesión CristoFit Camp - 100%"
      },
      {
        "date": "2026-08-22",
        "attended": true,
        "notes": "Entrenamiento de fuerza y calistenia"
      },
      {
        "date": "2026-08-24",
        "attended": true,
        "notes": "Movilidad articular y Buteyko"
      }
    ],
    "assessments": [
      {
        "date": "2026-08-01",
        "weightKg": 72.3,
        "heightM": 1.6,
        "imc": 28.2,
        "notes": "Evaluación inicial de ciclo"
      },
      {
        "date": "2026-08-22",
        "weightKg": 70.5,
        "heightM": 1.6,
        "imc": 27.5,
        "notes": "Progreso notable en resistencia y fuerza"
      }
    ],
    "escuadronId": "Gedeón-2",
    "phase": "2 - Desarrollo",
    "isVipProfile": false,
    "hubConsumption": {
      "snackBar": false,
      "merchandise": false,
      "preventiveMedicine": false
    },
    "avatarUrl": ""
  },
  {
    "id": "std-26",
    "name": "Claudia Justiniano",
    "phone": "+59173176694",
    "email": "claudia.justiniano@templefit.com",
    "instructorAssigned": "Paulo Alberto Gil Cuellar (Head Coach)",
    "status": "active",
    "plan": "Membresía Mensual",
    "startDate": "2026-08-01",
    "renewalDate": "2026-09-15",
    "birthDate": "1999-03-25",
    "paidServiceTitle": "Membresía Mensual Atleta (200 Bs.)",
    "serviceFeeBs": 200,
    "billingCycle": "mensual",
    "paymentStatus": "pagado",
    "amountPaidBs": 200,
    "pendingBalanceBs": 0,
    "lastPaymentDate": "2026-08-05",
    "nextDueDate": "2026-09-01",
    "additionalServices": [
      "Snack Bar Prepago",
      "ElectroHidra"
    ],
    "snackBarBalanceBs": 0,
    "physicalGoal": "Fuerza funcional, calistenia y pérdida de 4kg de grasa",
    "weightKg": 78,
    "heightM": 1.63,
    "workoutLevel": "Intermedio",
    "currentRoutineExercises": "1. Calistenia funcional básica y movilidad\n2. Sentadillas con peso corporal (4x15)\n3. Flexiones en barra inclinada (4x10)\n4. Planchas isométricas (4x45s)\n5. Caminata activa y respiración nasal",
    "nutritionPlan": "Catering Saludable Abuela Fit + Hidratación Activa",
    "currentDiet": "Dieta hipercalórica desordenada, bajo consumo de agua.",
    "prescribedDiet": "Catering Abuela Fit + 3L de agua alcalina con electrolitos naturales. Suplemento con glutamina.",
    "allergiesOrRestrictions": "Ninguna",
    "eatingDisordersOrIssues": "Sin trastornos diagnosticados.",
    "neuroticAndStressFactors": "Manejo de estrés cotidiano.",
    "spiritualIntention": "Buscar paz interior frente al estrés laboral mediante devocionales y Buteyko.",
    "mentorshipNotes": "Atleta integrado al escuadrón Gedeón-3. Compromiso regular en sesiones CristoFit Camp.",
    "attendanceHistory": [
      {
        "date": "2026-08-20",
        "attended": true,
        "notes": "Sesión CristoFit Camp - 100%"
      },
      {
        "date": "2026-08-22",
        "attended": true,
        "notes": "Entrenamiento de fuerza y calistenia"
      },
      {
        "date": "2026-08-24",
        "attended": true,
        "notes": "Movilidad articular y Buteyko"
      }
    ],
    "assessments": [
      {
        "date": "2026-08-01",
        "weightKg": 79.8,
        "heightM": 1.63,
        "imc": 30,
        "notes": "Evaluación inicial de ciclo"
      },
      {
        "date": "2026-08-22",
        "weightKg": 78,
        "heightM": 1.63,
        "imc": 29.4,
        "notes": "Progreso notable en resistencia y fuerza"
      }
    ],
    "escuadronId": "Gedeón-3",
    "phase": "2 - Desarrollo",
    "isVipProfile": false,
    "hubConsumption": {
      "snackBar": true,
      "merchandise": false,
      "preventiveMedicine": false
    },
    "avatarUrl": ""
  },
  {
    "id": "std-27",
    "name": "Gabriel Montero",
    "phone": "+59173260413",
    "email": "gabriel.montero@templefit.com",
    "instructorAssigned": "Paulo Alberto Gil Cuellar (Head Coach)",
    "status": "active",
    "plan": "Membresía Mensual",
    "startDate": "2026-08-01",
    "renewalDate": "2026-09-15",
    "birthDate": "2000-04-01",
    "paidServiceTitle": "Membresía Mensual Atleta (200 Bs.)",
    "serviceFeeBs": 200,
    "billingCycle": "mensual",
    "paymentStatus": "pagado",
    "amountPaidBs": 200,
    "pendingBalanceBs": 0,
    "lastPaymentDate": "2026-08-05",
    "nextDueDate": "2026-09-01",
    "additionalServices": [
      "Chequeo Antropométrico"
    ],
    "snackBarBalanceBs": 50,
    "physicalGoal": "Composición corporal, masa muscular magra y resistencia",
    "weightKg": 84,
    "heightM": 1.66,
    "workoutLevel": "Intermedio",
    "currentRoutineExercises": "1. Muscle-ups y fondos lastrados (4x6)\n2. Dominadas con agarre supino (4x10)\n3. Pistols asistidos (4x8 p/lado)\n4. Flexiones pliométricas (4x12)\n5. Sparring técnico y Buteyko",
    "nutritionPlan": "Smoothie de Salomón + Plan Detox 0 Azúcar",
    "currentDiet": "Salteo de comidas, exceso de gaseosas y azúcar refinada.",
    "prescribedDiet": "Detox 21 Días sin azúcar. Smoothie de Salomón matutino, ensaladas verdes y pescado fresco.",
    "allergiesOrRestrictions": "Ninguna",
    "eatingDisordersOrIssues": "Sin trastornos diagnosticados.",
    "neuroticAndStressFactors": "Tensión cervical por jornadas frente a pantalla y cortisol elevado",
    "spiritualIntention": "Liderar su escuadrón con humildad, servicio y constancia innegociable.",
    "mentorshipNotes": "Atleta integrado al escuadrón Gedeón-4. Compromiso regular en sesiones CristoFit Camp.",
    "attendanceHistory": [
      {
        "date": "2026-08-20",
        "attended": true,
        "notes": "Sesión CristoFit Camp - 100%"
      },
      {
        "date": "2026-08-22",
        "attended": true,
        "notes": "Entrenamiento de fuerza y calistenia"
      },
      {
        "date": "2026-08-24",
        "attended": true,
        "notes": "Movilidad articular y Buteyko"
      }
    ],
    "assessments": [
      {
        "date": "2026-08-01",
        "weightKg": 85.8,
        "heightM": 1.66,
        "imc": 31.1,
        "notes": "Evaluación inicial de ciclo"
      },
      {
        "date": "2026-08-22",
        "weightKg": 84,
        "heightM": 1.66,
        "imc": 30.5,
        "notes": "Progreso notable en resistencia y fuerza"
      }
    ],
    "escuadronId": "Gedeón-4",
    "phase": "2 - Desarrollo",
    "isVipProfile": false,
    "hubConsumption": {
      "snackBar": false,
      "merchandise": true,
      "preventiveMedicine": false
    },
    "avatarUrl": ""
  },
  {
    "id": "std-28",
    "name": "Adriana Siles",
    "phone": "+59173344132",
    "email": "adriana.siles@templefit.com",
    "instructorAssigned": "Paulo Alberto Gil Cuellar (Head Coach)",
    "status": "active",
    "plan": "Membresía Mensual",
    "startDate": "2026-08-01",
    "renewalDate": "2026-09-15",
    "birthDate": "2001-05-04",
    "paidServiceTitle": "Membresía Mensual Atleta (200 Bs.)",
    "serviceFeeBs": 200,
    "billingCycle": "mensual",
    "paymentStatus": "pagado",
    "amountPaidBs": 200,
    "pendingBalanceBs": 0,
    "lastPaymentDate": "2026-08-05",
    "nextDueDate": "2026-09-01",
    "additionalServices": [
      "Snack Bar Prepago",
      "ElectroHidra"
    ],
    "snackBarBalanceBs": 0,
    "physicalGoal": "Fuerza funcional, calistenia y pérdida de 4kg de grasa",
    "weightKg": 59.5,
    "heightM": 1.69,
    "workoutLevel": "Intermedio",
    "currentRoutineExercises": "1. Flexiones regulares y declinadas (4x15)\n2. Remo invertido en paralelas (4x10)\n3. Estocadas dinámicas (4x12)\n4. Elevación de piernas en barra (4x10)\n5. Cardio CristoFit Camp 06:00 AM",
    "nutritionPlan": "Protocolo Salomón + Proteína Limpia",
    "currentDiet": "Desayuno con café y pan, almuerzo irregular, cenas pesadas.",
    "prescribedDiet": "06:00 AM: ElectroHidra 1L. 08:00 AM: Bowl de Elías. Almuerzo anti-inflamatorio con proteína limpia y verduras.",
    "allergiesOrRestrictions": "Ninguna",
    "eatingDisordersOrIssues": "Tendencia a picoteo por estrés en horario laboral",
    "neuroticAndStressFactors": "Manejo de estrés cotidiano.",
    "spiritualIntention": "Alinear cuerpo, mente y espíritu como templo del Creador (1 Corintios 6:19).",
    "mentorshipNotes": "Atleta integrado al escuadrón Gedeón-5. Compromiso regular en sesiones CristoFit Camp.",
    "attendanceHistory": [
      {
        "date": "2026-08-20",
        "attended": true,
        "notes": "Sesión CristoFit Camp - 100%"
      },
      {
        "date": "2026-08-22",
        "attended": true,
        "notes": "Entrenamiento de fuerza y calistenia"
      },
      {
        "date": "2026-08-24",
        "attended": true,
        "notes": "Movilidad articular y Buteyko"
      }
    ],
    "assessments": [
      {
        "date": "2026-08-01",
        "weightKg": 61.3,
        "heightM": 1.69,
        "imc": 21.5,
        "notes": "Evaluación inicial de ciclo"
      },
      {
        "date": "2026-08-22",
        "weightKg": 59.5,
        "heightM": 1.69,
        "imc": 20.8,
        "notes": "Progreso notable en resistencia y fuerza"
      }
    ],
    "escuadronId": "Gedeón-5",
    "phase": "2 - Desarrollo",
    "isVipProfile": false,
    "hubConsumption": {
      "snackBar": true,
      "merchandise": false,
      "preventiveMedicine": true
    },
    "avatarUrl": ""
  },
  {
    "id": "std-29",
    "name": "Fabián Arteaga",
    "phone": "+59173427851",
    "email": "fabian.arteaga@templefit.com",
    "instructorAssigned": "Paulo Alberto Gil Cuellar (Head Coach)",
    "status": "active",
    "plan": "Membresía Mensual",
    "startDate": "2026-08-01",
    "renewalDate": "2026-09-15",
    "birthDate": "2002-06-07",
    "paidServiceTitle": "Membresía Mensual Atleta (200 Bs.)",
    "serviceFeeBs": 200,
    "billingCycle": "mensual",
    "paymentStatus": "pagado",
    "amountPaidBs": 200,
    "pendingBalanceBs": 0,
    "lastPaymentDate": "2026-08-05",
    "nextDueDate": "2026-09-01",
    "additionalServices": [
      "Chequeo Antropométrico"
    ],
    "snackBarBalanceBs": 0,
    "physicalGoal": "Composición corporal, masa muscular magra y resistencia",
    "weightKg": 67,
    "heightM": 1.72,
    "workoutLevel": "Intermedio",
    "currentRoutineExercises": "1. Trabajo de core y estabilidad lumbar\n2. Flexiones hindúes y pike pushups (4x10)\n3. Saltos de cuerda (5 rondas x 2 min)\n4. Dominadas escapulares (4x12)\n5. Hidratación con ElectroHidra",
    "nutritionPlan": "ElectroHidra + Nutrición Anti-inflamatoria",
    "currentDiet": "Comida rápida al mediodía, picoteo dulce por ansiedad en la tarde.",
    "prescribedDiet": "Plan Base Anti-inflamatorio. Snacks de frutos secos y batido verde. Cena ligera antes de las 20:00.",
    "allergiesOrRestrictions": "Ninguna",
    "eatingDisordersOrIssues": "Sin trastornos diagnosticados.",
    "neuroticAndStressFactors": "Manejo de estrés cotidiano.",
    "spiritualIntention": "Cultivar autodominio y templanza en momentos de alta presión profesional.",
    "mentorshipNotes": "Atleta integrado al escuadrón Gedeón-6. Compromiso regular en sesiones CristoFit Camp.",
    "attendanceHistory": [
      {
        "date": "2026-08-20",
        "attended": true,
        "notes": "Sesión CristoFit Camp - 100%"
      },
      {
        "date": "2026-08-22",
        "attended": true,
        "notes": "Entrenamiento de fuerza y calistenia"
      },
      {
        "date": "2026-08-24",
        "attended": true,
        "notes": "Movilidad articular y Buteyko"
      }
    ],
    "assessments": [
      {
        "date": "2026-08-01",
        "weightKg": 68.8,
        "heightM": 1.72,
        "imc": 23.3,
        "notes": "Evaluación inicial de ciclo"
      },
      {
        "date": "2026-08-22",
        "weightKg": 67,
        "heightM": 1.72,
        "imc": 22.6,
        "notes": "Progreso notable en resistencia y fuerza"
      }
    ],
    "escuadronId": "Gedeón-6",
    "phase": "2 - Desarrollo",
    "isVipProfile": false,
    "hubConsumption": {
      "snackBar": false,
      "merchandise": false,
      "preventiveMedicine": false
    },
    "avatarUrl": ""
  },
  {
    "id": "std-30",
    "name": "Alejandra Cossio",
    "phone": "+59173511570",
    "email": "alejandra.cossio@templefit.com",
    "instructorAssigned": "Paulo Alberto Gil Cuellar (Head Coach)",
    "status": "active",
    "plan": "Membresía Mensual",
    "startDate": "2026-08-01",
    "renewalDate": "2026-09-15",
    "birthDate": "1988-07-10",
    "paidServiceTitle": "Membresía Mensual Atleta (200 Bs.)",
    "serviceFeeBs": 200,
    "billingCycle": "mensual",
    "paymentStatus": "pagado",
    "amountPaidBs": 200,
    "pendingBalanceBs": 0,
    "lastPaymentDate": "2026-08-05",
    "nextDueDate": "2026-09-01",
    "additionalServices": [
      "Snack Bar Prepago",
      "ElectroHidra"
    ],
    "snackBarBalanceBs": 50,
    "physicalGoal": "Fuerza funcional, calistenia y pérdida de 4kg de grasa",
    "weightKg": 73,
    "heightM": 1.75,
    "workoutLevel": "Intermedio",
    "currentRoutineExercises": "1. Dominadas estrictas (4x8)\n2. Fondos en paralelas (4x10)\n3. Sentadilla búlgara (4x12)\n4. Flexiones diamante (4x15)\n5. Buteyko y cardio matutino 06:00 AM",
    "nutritionPlan": "Catering Saludable Abuela Fit + Hidratación Activa",
    "currentDiet": "Dieta hipercalórica desordenada, bajo consumo de agua.",
    "prescribedDiet": "Catering Abuela Fit + 3L de agua alcalina con electrolitos naturales. Suplemento con glutamina.",
    "allergiesOrRestrictions": "Sensibilidad a la lactosa",
    "eatingDisordersOrIssues": "Sin trastornos diagnosticados.",
    "neuroticAndStressFactors": "Tensión cervical por jornadas frente a pantalla y cortisol elevado",
    "spiritualIntention": "Consolidar la disciplina del despertar a las 05:30 AM con oración y enfoque.",
    "mentorshipNotes": "Atleta integrado al escuadrón Gedeón-7. Compromiso regular en sesiones CristoFit Camp.",
    "attendanceHistory": [
      {
        "date": "2026-08-20",
        "attended": true,
        "notes": "Sesión CristoFit Camp - 100%"
      },
      {
        "date": "2026-08-22",
        "attended": true,
        "notes": "Entrenamiento de fuerza y calistenia"
      },
      {
        "date": "2026-08-24",
        "attended": true,
        "notes": "Movilidad articular y Buteyko"
      }
    ],
    "assessments": [
      {
        "date": "2026-08-01",
        "weightKg": 74.8,
        "heightM": 1.75,
        "imc": 24.4,
        "notes": "Evaluación inicial de ciclo"
      },
      {
        "date": "2026-08-22",
        "weightKg": 73,
        "heightM": 1.75,
        "imc": 23.8,
        "notes": "Progreso notable en resistencia y fuerza"
      }
    ],
    "escuadronId": "Gedeón-7",
    "phase": "2 - Desarrollo",
    "isVipProfile": false,
    "hubConsumption": {
      "snackBar": true,
      "merchandise": true,
      "preventiveMedicine": false
    },
    "avatarUrl": ""
  },
  {
    "id": "std-31",
    "name": "Leonardo Daza",
    "phone": "+59173595289",
    "email": "leonardo.daza@templefit.com",
    "instructorAssigned": "Paulo Alberto Gil Cuellar (Head Coach)",
    "status": "active",
    "plan": "Membresía Mensual",
    "startDate": "2026-08-01",
    "renewalDate": "2026-09-15",
    "birthDate": "1989-08-13",
    "paidServiceTitle": "Membresía Mensual Atleta (200 Bs.)",
    "serviceFeeBs": 200,
    "billingCycle": "mensual",
    "paymentStatus": "pagado",
    "amountPaidBs": 200,
    "pendingBalanceBs": 0,
    "lastPaymentDate": "2026-08-05",
    "nextDueDate": "2026-09-01",
    "additionalServices": [
      "Chequeo Antropométrico"
    ],
    "snackBarBalanceBs": 0,
    "physicalGoal": "Composición corporal, masa muscular magra y resistencia",
    "weightKg": 80.5,
    "heightM": 1.78,
    "workoutLevel": "Intermedio",
    "currentRoutineExercises": "1. Calistenia funcional básica y movilidad\n2. Sentadillas con peso corporal (4x15)\n3. Flexiones en barra inclinada (4x10)\n4. Planchas isométricas (4x45s)\n5. Caminata activa y respiración nasal",
    "nutritionPlan": "Smoothie de Salomón + Plan Detox 0 Azúcar",
    "currentDiet": "Salteo de comidas, exceso de gaseosas y azúcar refinada.",
    "prescribedDiet": "Detox 21 Días sin azúcar. Smoothie de Salomón matutino, ensaladas verdes y pescado fresco.",
    "allergiesOrRestrictions": "Ninguna",
    "eatingDisordersOrIssues": "Sin trastornos diagnosticados.",
    "neuroticAndStressFactors": "Manejo de estrés cotidiano.",
    "spiritualIntention": "Superar la pereza mental y liderar con el ejemplo en su hogar y trabajo.",
    "mentorshipNotes": "Atleta integrado al escuadrón Gedeón-8. Compromiso regular en sesiones CristoFit Camp.",
    "attendanceHistory": [
      {
        "date": "2026-08-20",
        "attended": true,
        "notes": "Sesión CristoFit Camp - 100%"
      },
      {
        "date": "2026-08-22",
        "attended": true,
        "notes": "Entrenamiento de fuerza y calistenia"
      },
      {
        "date": "2026-08-24",
        "attended": true,
        "notes": "Movilidad articular y Buteyko"
      }
    ],
    "assessments": [
      {
        "date": "2026-08-01",
        "weightKg": 82.3,
        "heightM": 1.78,
        "imc": 26,
        "notes": "Evaluación inicial de ciclo"
      },
      {
        "date": "2026-08-22",
        "weightKg": 80.5,
        "heightM": 1.78,
        "imc": 25.4,
        "notes": "Progreso notable en resistencia y fuerza"
      }
    ],
    "escuadronId": "Gedeón-8",
    "phase": "2 - Desarrollo",
    "isVipProfile": false,
    "hubConsumption": {
      "snackBar": false,
      "merchandise": false,
      "preventiveMedicine": false
    },
    "avatarUrl": ""
  },
  {
    "id": "std-32",
    "name": "Melany Rivero",
    "phone": "+59173679008",
    "email": "melany.rivero@templefit.com",
    "instructorAssigned": "Paulo Alberto Gil Cuellar (Head Coach)",
    "status": "expiring",
    "plan": "Membresía Mensual",
    "startDate": "2026-08-01",
    "renewalDate": "2026-08-28",
    "birthDate": "1990-09-16",
    "paidServiceTitle": "Membresía Mensual Atleta (200 Bs.)",
    "serviceFeeBs": 200,
    "billingCycle": "mensual",
    "paymentStatus": "pendiente",
    "amountPaidBs": 0,
    "pendingBalanceBs": 200,
    "lastPaymentDate": "",
    "nextDueDate": "2026-09-01",
    "additionalServices": [
      "Snack Bar Prepago",
      "ElectroHidra"
    ],
    "snackBarBalanceBs": 0,
    "physicalGoal": "Fuerza funcional, calistenia y pérdida de 4kg de grasa",
    "weightKg": 56,
    "heightM": 1.81,
    "workoutLevel": "Avanzado",
    "currentRoutineExercises": "1. Muscle-ups y fondos lastrados (4x6)\n2. Dominadas con agarre supino (4x10)\n3. Pistols asistidos (4x8 p/lado)\n4. Flexiones pliométricas (4x12)\n5. Sparring técnico y Buteyko",
    "nutritionPlan": "Protocolo Salomón + Proteína Limpia",
    "currentDiet": "Desayuno con café y pan, almuerzo irregular, cenas pesadas.",
    "prescribedDiet": "06:00 AM: ElectroHidra 1L. 08:00 AM: Bowl de Elías. Almuerzo anti-inflamatorio con proteína limpia y verduras.",
    "allergiesOrRestrictions": "Ninguna",
    "eatingDisordersOrIssues": "Tendencia a picoteo por estrés en horario laboral",
    "neuroticAndStressFactors": "Manejo de estrés cotidiano.",
    "spiritualIntention": "Buscar paz interior frente al estrés laboral mediante devocionales y Buteyko.",
    "mentorshipNotes": "Atleta integrado al escuadrón Cristo-1. Compromiso regular en sesiones CristoFit Camp.",
    "attendanceHistory": [
      {
        "date": "2026-08-20",
        "attended": true,
        "notes": "Sesión CristoFit Camp - 100%"
      },
      {
        "date": "2026-08-22",
        "attended": true,
        "notes": "Entrenamiento de fuerza y calistenia"
      },
      {
        "date": "2026-08-24",
        "attended": true,
        "notes": "Movilidad articular y Buteyko"
      }
    ],
    "assessments": [
      {
        "date": "2026-08-01",
        "weightKg": 57.8,
        "heightM": 1.81,
        "imc": 17.6,
        "notes": "Evaluación inicial de ciclo"
      },
      {
        "date": "2026-08-22",
        "weightKg": 56,
        "heightM": 1.81,
        "imc": 17.1,
        "notes": "Progreso notable en resistencia y fuerza"
      }
    ],
    "escuadronId": "Cristo-1",
    "phase": "3 - Perfeccionamiento",
    "isVipProfile": false,
    "hubConsumption": {
      "snackBar": true,
      "merchandise": false,
      "preventiveMedicine": true
    },
    "avatarUrl": ""
  },
  {
    "id": "std-33",
    "name": "Lucas Arze",
    "phone": "+59173762727",
    "email": "lucas.arze@templefit.com",
    "instructorAssigned": "Paulo Alberto Gil Cuellar (Head Coach)",
    "status": "active",
    "plan": "Membresía Mensual",
    "startDate": "2026-08-01",
    "renewalDate": "2026-09-15",
    "birthDate": "1991-10-19",
    "paidServiceTitle": "Membresía Mensual Atleta (200 Bs.)",
    "serviceFeeBs": 200,
    "billingCycle": "mensual",
    "paymentStatus": "pagado",
    "amountPaidBs": 200,
    "pendingBalanceBs": 0,
    "lastPaymentDate": "2026-08-05",
    "nextDueDate": "2026-09-01",
    "additionalServices": [
      "Chequeo Antropométrico"
    ],
    "snackBarBalanceBs": 50,
    "physicalGoal": "Composición corporal, masa muscular magra y resistencia",
    "weightKg": 62,
    "heightM": 1.84,
    "workoutLevel": "Avanzado",
    "currentRoutineExercises": "1. Flexiones regulares y declinadas (4x15)\n2. Remo invertido en paralelas (4x10)\n3. Estocadas dinámicas (4x12)\n4. Elevación de piernas en barra (4x10)\n5. Cardio CristoFit Camp 06:00 AM",
    "nutritionPlan": "ElectroHidra + Nutrición Anti-inflamatoria",
    "currentDiet": "Comida rápida al mediodía, picoteo dulce por ansiedad en la tarde.",
    "prescribedDiet": "Plan Base Anti-inflamatorio. Snacks de frutos secos y batido verde. Cena ligera antes de las 20:00.",
    "allergiesOrRestrictions": "Ninguna",
    "eatingDisordersOrIssues": "Sin trastornos diagnosticados.",
    "neuroticAndStressFactors": "Tensión cervical por jornadas frente a pantalla y cortisol elevado",
    "spiritualIntention": "Liderar su escuadrón con humildad, servicio y constancia innegociable.",
    "mentorshipNotes": "Atleta integrado al escuadrón Cristo-2. Compromiso regular en sesiones CristoFit Camp.",
    "attendanceHistory": [
      {
        "date": "2026-08-20",
        "attended": true,
        "notes": "Sesión CristoFit Camp - 100%"
      },
      {
        "date": "2026-08-22",
        "attended": true,
        "notes": "Entrenamiento de fuerza y calistenia"
      },
      {
        "date": "2026-08-24",
        "attended": true,
        "notes": "Movilidad articular y Buteyko"
      }
    ],
    "assessments": [
      {
        "date": "2026-08-01",
        "weightKg": 63.8,
        "heightM": 1.84,
        "imc": 18.8,
        "notes": "Evaluación inicial de ciclo"
      },
      {
        "date": "2026-08-22",
        "weightKg": 62,
        "heightM": 1.84,
        "imc": 18.3,
        "notes": "Progreso notable en resistencia y fuerza"
      }
    ],
    "escuadronId": "Cristo-2",
    "phase": "3 - Perfeccionamiento",
    "isVipProfile": false,
    "hubConsumption": {
      "snackBar": false,
      "merchandise": true,
      "preventiveMedicine": false
    },
    "avatarUrl": ""
  },
  {
    "id": "std-34",
    "name": "Micaela Paz",
    "phone": "+59173846446",
    "email": "micaela.paz@templefit.com",
    "instructorAssigned": "Paulo Alberto Gil Cuellar (Head Coach)",
    "status": "active",
    "plan": "Membresía Mensual",
    "startDate": "2026-08-01",
    "renewalDate": "2026-09-15",
    "birthDate": "1992-11-22",
    "paidServiceTitle": "Membresía Mensual Atleta (200 Bs.)",
    "serviceFeeBs": 200,
    "billingCycle": "mensual",
    "paymentStatus": "pagado",
    "amountPaidBs": 200,
    "pendingBalanceBs": 0,
    "lastPaymentDate": "2026-08-05",
    "nextDueDate": "2026-09-01",
    "additionalServices": [
      "Snack Bar Prepago",
      "ElectroHidra"
    ],
    "snackBarBalanceBs": 0,
    "physicalGoal": "Fuerza funcional, calistenia y pérdida de 4kg de grasa",
    "weightKg": 69.5,
    "heightM": 1.62,
    "workoutLevel": "Avanzado",
    "currentRoutineExercises": "1. Trabajo de core y estabilidad lumbar\n2. Flexiones hindúes y pike pushups (4x10)\n3. Saltos de cuerda (5 rondas x 2 min)\n4. Dominadas escapulares (4x12)\n5. Hidratación con ElectroHidra",
    "nutritionPlan": "Catering Saludable Abuela Fit + Hidratación Activa",
    "currentDiet": "Dieta hipercalórica desordenada, bajo consumo de agua.",
    "prescribedDiet": "Catering Abuela Fit + 3L de agua alcalina con electrolitos naturales. Suplemento con glutamina.",
    "allergiesOrRestrictions": "Ninguna",
    "eatingDisordersOrIssues": "Sin trastornos diagnosticados.",
    "neuroticAndStressFactors": "Manejo de estrés cotidiano.",
    "spiritualIntention": "Alinear cuerpo, mente y espíritu como templo del Creador (1 Corintios 6:19).",
    "mentorshipNotes": "Atleta integrado al escuadrón Cristo-3. Compromiso regular en sesiones CristoFit Camp.",
    "attendanceHistory": [
      {
        "date": "2026-08-20",
        "attended": true,
        "notes": "Sesión CristoFit Camp - 100%"
      },
      {
        "date": "2026-08-22",
        "attended": true,
        "notes": "Entrenamiento de fuerza y calistenia"
      },
      {
        "date": "2026-08-24",
        "attended": true,
        "notes": "Movilidad articular y Buteyko"
      }
    ],
    "assessments": [
      {
        "date": "2026-08-01",
        "weightKg": 71.3,
        "heightM": 1.62,
        "imc": 27.2,
        "notes": "Evaluación inicial de ciclo"
      },
      {
        "date": "2026-08-22",
        "weightKg": 69.5,
        "heightM": 1.62,
        "imc": 26.5,
        "notes": "Progreso notable en resistencia y fuerza"
      }
    ],
    "escuadronId": "Cristo-3",
    "phase": "3 - Perfeccionamiento",
    "isVipProfile": false,
    "hubConsumption": {
      "snackBar": true,
      "merchandise": false,
      "preventiveMedicine": false
    },
    "avatarUrl": ""
  },
  {
    "id": "std-35",
    "name": "Santiago Soliz",
    "phone": "+59173930165",
    "email": "santiago.soliz@templefit.com",
    "instructorAssigned": "Paulo Alberto Gil Cuellar (Head Coach)",
    "status": "active",
    "plan": "Membresía Mensual",
    "startDate": "2026-08-01",
    "renewalDate": "2026-09-15",
    "birthDate": "1993-12-25",
    "paidServiceTitle": "Membresía Mensual Atleta (200 Bs.)",
    "serviceFeeBs": 200,
    "billingCycle": "mensual",
    "paymentStatus": "pagado",
    "amountPaidBs": 200,
    "pendingBalanceBs": 0,
    "lastPaymentDate": "2026-08-05",
    "nextDueDate": "2026-09-01",
    "additionalServices": [
      "Chequeo Antropométrico"
    ],
    "snackBarBalanceBs": 0,
    "physicalGoal": "Composición corporal, masa muscular magra y resistencia",
    "weightKg": 77,
    "heightM": 1.65,
    "workoutLevel": "Avanzado",
    "currentRoutineExercises": "1. Dominadas estrictas (4x8)\n2. Fondos en paralelas (4x10)\n3. Sentadilla búlgara (4x12)\n4. Flexiones diamante (4x15)\n5. Buteyko y cardio matutino 06:00 AM",
    "nutritionPlan": "Smoothie de Salomón + Plan Detox 0 Azúcar",
    "currentDiet": "Salteo de comidas, exceso de gaseosas y azúcar refinada.",
    "prescribedDiet": "Detox 21 Días sin azúcar. Smoothie de Salomón matutino, ensaladas verdes y pescado fresco.",
    "allergiesOrRestrictions": "Sensibilidad a la lactosa",
    "eatingDisordersOrIssues": "Sin trastornos diagnosticados.",
    "neuroticAndStressFactors": "Manejo de estrés cotidiano.",
    "spiritualIntention": "Cultivar autodominio y templanza en momentos de alta presión profesional.",
    "mentorshipNotes": "Atleta integrado al escuadrón Cristo-4. Compromiso regular en sesiones CristoFit Camp.",
    "attendanceHistory": [
      {
        "date": "2026-08-20",
        "attended": true,
        "notes": "Sesión CristoFit Camp - 100%"
      },
      {
        "date": "2026-08-22",
        "attended": true,
        "notes": "Entrenamiento de fuerza y calistenia"
      },
      {
        "date": "2026-08-24",
        "attended": true,
        "notes": "Movilidad articular y Buteyko"
      }
    ],
    "assessments": [
      {
        "date": "2026-08-01",
        "weightKg": 78.8,
        "heightM": 1.65,
        "imc": 28.9,
        "notes": "Evaluación inicial de ciclo"
      },
      {
        "date": "2026-08-22",
        "weightKg": 77,
        "heightM": 1.65,
        "imc": 28.3,
        "notes": "Progreso notable en resistencia y fuerza"
      }
    ],
    "escuadronId": "Cristo-4",
    "phase": "3 - Perfeccionamiento",
    "isVipProfile": false,
    "hubConsumption": {
      "snackBar": false,
      "merchandise": false,
      "preventiveMedicine": false
    },
    "avatarUrl": ""
  },
  {
    "id": "std-36",
    "name": "Patricia Barrientos",
    "phone": "+59174013884",
    "email": "patricia.barrientos@templefit.com",
    "instructorAssigned": "Paulo Alberto Gil Cuellar (Head Coach)",
    "status": "active",
    "plan": "Membresía Mensual",
    "startDate": "2026-08-01",
    "renewalDate": "2026-09-15",
    "birthDate": "1994-01-01",
    "paidServiceTitle": "Membresía Mensual Atleta (200 Bs.)",
    "serviceFeeBs": 200,
    "billingCycle": "mensual",
    "paymentStatus": "pagado",
    "amountPaidBs": 200,
    "pendingBalanceBs": 0,
    "lastPaymentDate": "2026-08-05",
    "nextDueDate": "2026-09-01",
    "additionalServices": [
      "Snack Bar Prepago",
      "ElectroHidra"
    ],
    "snackBarBalanceBs": 50,
    "physicalGoal": "Fuerza funcional, calistenia y pérdida de 4kg de grasa",
    "weightKg": 83,
    "heightM": 1.68,
    "workoutLevel": "Avanzado",
    "currentRoutineExercises": "1. Calistenia funcional básica y movilidad\n2. Sentadillas con peso corporal (4x15)\n3. Flexiones en barra inclinada (4x10)\n4. Planchas isométricas (4x45s)\n5. Caminata activa y respiración nasal",
    "nutritionPlan": "Protocolo Salomón + Proteína Limpia",
    "currentDiet": "Desayuno con café y pan, almuerzo irregular, cenas pesadas.",
    "prescribedDiet": "06:00 AM: ElectroHidra 1L. 08:00 AM: Bowl de Elías. Almuerzo anti-inflamatorio con proteína limpia y verduras.",
    "allergiesOrRestrictions": "Ninguna",
    "eatingDisordersOrIssues": "Tendencia a picoteo por estrés en horario laboral",
    "neuroticAndStressFactors": "Tensión cervical por jornadas frente a pantalla y cortisol elevado",
    "spiritualIntention": "Consolidar la disciplina del despertar a las 05:30 AM con oración y enfoque.",
    "mentorshipNotes": "Atleta integrado al escuadrón Cristo-5. Compromiso regular en sesiones CristoFit Camp.",
    "attendanceHistory": [
      {
        "date": "2026-08-20",
        "attended": true,
        "notes": "Sesión CristoFit Camp - 100%"
      },
      {
        "date": "2026-08-22",
        "attended": true,
        "notes": "Entrenamiento de fuerza y calistenia"
      },
      {
        "date": "2026-08-24",
        "attended": true,
        "notes": "Movilidad articular y Buteyko"
      }
    ],
    "assessments": [
      {
        "date": "2026-08-01",
        "weightKg": 84.8,
        "heightM": 1.68,
        "imc": 30,
        "notes": "Evaluación inicial de ciclo"
      },
      {
        "date": "2026-08-22",
        "weightKg": 83,
        "heightM": 1.68,
        "imc": 29.4,
        "notes": "Progreso notable en resistencia y fuerza"
      }
    ],
    "escuadronId": "Cristo-5",
    "phase": "3 - Perfeccionamiento",
    "isVipProfile": false,
    "hubConsumption": {
      "snackBar": true,
      "merchandise": true,
      "preventiveMedicine": true
    },
    "avatarUrl": ""
  },
  {
    "id": "std-37",
    "name": "Bruno Melgar",
    "phone": "+59174097603",
    "email": "bruno.melgar@templefit.com",
    "instructorAssigned": "Paulo Alberto Gil Cuellar (Head Coach)",
    "status": "active",
    "plan": "Membresía Mensual",
    "startDate": "2026-08-01",
    "renewalDate": "2026-09-15",
    "birthDate": "1995-02-04",
    "paidServiceTitle": "Membresía Mensual Atleta (200 Bs.)",
    "serviceFeeBs": 200,
    "billingCycle": "mensual",
    "paymentStatus": "parcial",
    "amountPaidBs": 100,
    "pendingBalanceBs": 100,
    "lastPaymentDate": "2026-08-05",
    "nextDueDate": "2026-09-01",
    "additionalServices": [
      "Chequeo Antropométrico"
    ],
    "snackBarBalanceBs": 0,
    "physicalGoal": "Composición corporal, masa muscular magra y resistencia",
    "weightKg": 58.5,
    "heightM": 1.71,
    "workoutLevel": "Avanzado",
    "currentRoutineExercises": "1. Muscle-ups y fondos lastrados (4x6)\n2. Dominadas con agarre supino (4x10)\n3. Pistols asistidos (4x8 p/lado)\n4. Flexiones pliométricas (4x12)\n5. Sparring técnico y Buteyko",
    "nutritionPlan": "ElectroHidra + Nutrición Anti-inflamatoria",
    "currentDiet": "Comida rápida al mediodía, picoteo dulce por ansiedad en la tarde.",
    "prescribedDiet": "Plan Base Anti-inflamatorio. Snacks de frutos secos y batido verde. Cena ligera antes de las 20:00.",
    "allergiesOrRestrictions": "Ninguna",
    "eatingDisordersOrIssues": "Sin trastornos diagnosticados.",
    "neuroticAndStressFactors": "Manejo de estrés cotidiano.",
    "spiritualIntention": "Superar la pereza mental y liderar con el ejemplo en su hogar y trabajo.",
    "mentorshipNotes": "Atleta integrado al escuadrón Cristo-6. Compromiso regular en sesiones CristoFit Camp.",
    "attendanceHistory": [
      {
        "date": "2026-08-20",
        "attended": true,
        "notes": "Sesión CristoFit Camp - 100%"
      },
      {
        "date": "2026-08-22",
        "attended": true,
        "notes": "Entrenamiento de fuerza y calistenia"
      },
      {
        "date": "2026-08-24",
        "attended": true,
        "notes": "Movilidad articular y Buteyko"
      }
    ],
    "assessments": [
      {
        "date": "2026-08-01",
        "weightKg": 60.3,
        "heightM": 1.71,
        "imc": 20.6,
        "notes": "Evaluación inicial de ciclo"
      },
      {
        "date": "2026-08-22",
        "weightKg": 58.5,
        "heightM": 1.71,
        "imc": 20,
        "notes": "Progreso notable en resistencia y fuerza"
      }
    ],
    "escuadronId": "Cristo-6",
    "phase": "3 - Perfeccionamiento",
    "isVipProfile": false,
    "hubConsumption": {
      "snackBar": false,
      "merchandise": false,
      "preventiveMedicine": false
    },
    "avatarUrl": ""
  },
  {
    "id": "std-38",
    "name": "Estefanía Roca",
    "phone": "+59174181322",
    "email": "estefania.roca@templefit.com",
    "instructorAssigned": "Paulo Alberto Gil Cuellar (Head Coach)",
    "status": "active",
    "plan": "Membresía Mensual",
    "startDate": "2026-08-01",
    "renewalDate": "2026-09-15",
    "birthDate": "1996-03-07",
    "paidServiceTitle": "Membresía Mensual Atleta (200 Bs.)",
    "serviceFeeBs": 200,
    "billingCycle": "mensual",
    "paymentStatus": "pagado",
    "amountPaidBs": 200,
    "pendingBalanceBs": 0,
    "lastPaymentDate": "2026-08-05",
    "nextDueDate": "2026-09-01",
    "additionalServices": [
      "Snack Bar Prepago",
      "ElectroHidra"
    ],
    "snackBarBalanceBs": 0,
    "physicalGoal": "Fuerza funcional, calistenia y pérdida de 4kg de grasa",
    "weightKg": 66,
    "heightM": 1.74,
    "workoutLevel": "Avanzado",
    "currentRoutineExercises": "1. Flexiones regulares y declinadas (4x15)\n2. Remo invertido en paralelas (4x10)\n3. Estocadas dinámicas (4x12)\n4. Elevación de piernas en barra (4x10)\n5. Cardio CristoFit Camp 06:00 AM",
    "nutritionPlan": "Catering Saludable Abuela Fit + Hidratación Activa",
    "currentDiet": "Dieta hipercalórica desordenada, bajo consumo de agua.",
    "prescribedDiet": "Catering Abuela Fit + 3L de agua alcalina con electrolitos naturales. Suplemento con glutamina.",
    "allergiesOrRestrictions": "Ninguna",
    "eatingDisordersOrIssues": "Sin trastornos diagnosticados.",
    "neuroticAndStressFactors": "Manejo de estrés cotidiano.",
    "spiritualIntention": "Buscar paz interior frente al estrés laboral mediante devocionales y Buteyko.",
    "mentorshipNotes": "Atleta integrado al escuadrón Cristo-7. Compromiso regular en sesiones CristoFit Camp.",
    "attendanceHistory": [
      {
        "date": "2026-08-20",
        "attended": true,
        "notes": "Sesión CristoFit Camp - 100%"
      },
      {
        "date": "2026-08-22",
        "attended": true,
        "notes": "Entrenamiento de fuerza y calistenia"
      },
      {
        "date": "2026-08-24",
        "attended": true,
        "notes": "Movilidad articular y Buteyko"
      }
    ],
    "assessments": [
      {
        "date": "2026-08-01",
        "weightKg": 67.8,
        "heightM": 1.74,
        "imc": 22.4,
        "notes": "Evaluación inicial de ciclo"
      },
      {
        "date": "2026-08-22",
        "weightKg": 66,
        "heightM": 1.74,
        "imc": 21.8,
        "notes": "Progreso notable en resistencia y fuerza"
      }
    ],
    "escuadronId": "Cristo-7",
    "phase": "3 - Perfeccionamiento",
    "isVipProfile": false,
    "hubConsumption": {
      "snackBar": true,
      "merchandise": false,
      "preventiveMedicine": false
    },
    "avatarUrl": ""
  },
  {
    "id": "std-39",
    "name": "Joaquín Cuéllar",
    "phone": "+59174265041",
    "email": "joaquin.cuellar@templefit.com",
    "instructorAssigned": "Paulo Alberto Gil Cuellar (Head Coach)",
    "status": "active",
    "plan": "Membresía Mensual",
    "startDate": "2026-08-01",
    "renewalDate": "2026-09-15",
    "birthDate": "1997-04-10",
    "paidServiceTitle": "Membresía Mensual Atleta (200 Bs.)",
    "serviceFeeBs": 200,
    "billingCycle": "mensual",
    "paymentStatus": "pagado",
    "amountPaidBs": 200,
    "pendingBalanceBs": 0,
    "lastPaymentDate": "2026-08-05",
    "nextDueDate": "2026-09-01",
    "additionalServices": [
      "Chequeo Antropométrico"
    ],
    "snackBarBalanceBs": 50,
    "physicalGoal": "Composición corporal, masa muscular magra y resistencia",
    "weightKg": 72,
    "heightM": 1.77,
    "workoutLevel": "Avanzado",
    "currentRoutineExercises": "1. Trabajo de core y estabilidad lumbar\n2. Flexiones hindúes y pike pushups (4x10)\n3. Saltos de cuerda (5 rondas x 2 min)\n4. Dominadas escapulares (4x12)\n5. Hidratación con ElectroHidra",
    "nutritionPlan": "Smoothie de Salomón + Plan Detox 0 Azúcar",
    "currentDiet": "Salteo de comidas, exceso de gaseosas y azúcar refinada.",
    "prescribedDiet": "Detox 21 Días sin azúcar. Smoothie de Salomón matutino, ensaladas verdes y pescado fresco.",
    "allergiesOrRestrictions": "Ninguna",
    "eatingDisordersOrIssues": "Sin trastornos diagnosticados.",
    "neuroticAndStressFactors": "Tensión cervical por jornadas frente a pantalla y cortisol elevado",
    "spiritualIntention": "Liderar su escuadrón con humildad, servicio y constancia innegociable.",
    "mentorshipNotes": "Atleta integrado al escuadrón Cristo-8. Compromiso regular en sesiones CristoFit Camp.",
    "attendanceHistory": [
      {
        "date": "2026-08-20",
        "attended": true,
        "notes": "Sesión CristoFit Camp - 100%"
      },
      {
        "date": "2026-08-22",
        "attended": true,
        "notes": "Entrenamiento de fuerza y calistenia"
      },
      {
        "date": "2026-08-24",
        "attended": true,
        "notes": "Movilidad articular y Buteyko"
      }
    ],
    "assessments": [
      {
        "date": "2026-08-01",
        "weightKg": 73.8,
        "heightM": 1.77,
        "imc": 23.6,
        "notes": "Evaluación inicial de ciclo"
      },
      {
        "date": "2026-08-22",
        "weightKg": 72,
        "heightM": 1.77,
        "imc": 23,
        "notes": "Progreso notable en resistencia y fuerza"
      }
    ],
    "escuadronId": "Cristo-8",
    "phase": "3 - Perfeccionamiento",
    "isVipProfile": false,
    "hubConsumption": {
      "snackBar": false,
      "merchandise": true,
      "preventiveMedicine": false
    },
    "avatarUrl": ""
  },
  {
    "id": "std-40",
    "name": "Silvia Camacho",
    "phone": "+59174348760",
    "email": "silvia.camacho@templefit.com",
    "instructorAssigned": "Paulo Alberto Gil Cuellar (Head Coach)",
    "status": "active",
    "plan": "Membresía Mensual",
    "startDate": "2026-08-01",
    "renewalDate": "2026-09-15",
    "birthDate": "1998-05-13",
    "paidServiceTitle": "Membresía Mensual Atleta (200 Bs.)",
    "serviceFeeBs": 200,
    "billingCycle": "mensual",
    "paymentStatus": "pagado",
    "amountPaidBs": 200,
    "pendingBalanceBs": 0,
    "lastPaymentDate": "2026-08-05",
    "nextDueDate": "2026-09-01",
    "additionalServices": [
      "Snack Bar Prepago",
      "ElectroHidra"
    ],
    "snackBarBalanceBs": 0,
    "physicalGoal": "Fuerza funcional, calistenia y pérdida de 4kg de grasa",
    "weightKg": 79.5,
    "heightM": 1.8,
    "workoutLevel": "Principiante",
    "currentRoutineExercises": "1. Dominadas estrictas (4x8)\n2. Fondos en paralelas (4x10)\n3. Sentadilla búlgara (4x12)\n4. Flexiones diamante (4x15)\n5. Buteyko y cardio matutino 06:00 AM",
    "nutritionPlan": "Protocolo Salomón + Proteína Limpia",
    "currentDiet": "Desayuno con café y pan, almuerzo irregular, cenas pesadas.",
    "prescribedDiet": "06:00 AM: ElectroHidra 1L. 08:00 AM: Bowl de Elías. Almuerzo anti-inflamatorio con proteína limpia y verduras.",
    "allergiesOrRestrictions": "Sensibilidad a la lactosa",
    "eatingDisordersOrIssues": "Tendencia a picoteo por estrés en horario laboral",
    "neuroticAndStressFactors": "Manejo de estrés cotidiano.",
    "spiritualIntention": "Alinear cuerpo, mente y espíritu como templo del Creador (1 Corintios 6:19).",
    "mentorshipNotes": "Atleta integrado al escuadrón Paz-Alfa. Compromiso regular en sesiones CristoFit Camp.",
    "attendanceHistory": [
      {
        "date": "2026-08-20",
        "attended": true,
        "notes": "Sesión CristoFit Camp - 100%"
      },
      {
        "date": "2026-08-22",
        "attended": true,
        "notes": "Entrenamiento de fuerza y calistenia"
      },
      {
        "date": "2026-08-24",
        "attended": true,
        "notes": "Movilidad articular y Buteyko"
      }
    ],
    "assessments": [
      {
        "date": "2026-08-01",
        "weightKg": 81.3,
        "heightM": 1.8,
        "imc": 25.1,
        "notes": "Evaluación inicial de ciclo"
      },
      {
        "date": "2026-08-22",
        "weightKg": 79.5,
        "heightM": 1.8,
        "imc": 24.5,
        "notes": "Progreso notable en resistencia y fuerza"
      }
    ],
    "escuadronId": "Paz-Alfa",
    "phase": "1 - Iniciación",
    "isVipProfile": false,
    "hubConsumption": {
      "snackBar": true,
      "merchandise": false,
      "preventiveMedicine": true
    },
    "avatarUrl": ""
  },
  {
    "id": "std-41",
    "name": "Matías Baldivieso",
    "phone": "+59174432479",
    "email": "matias.baldivieso@templefit.com",
    "instructorAssigned": "Paulo Alberto Gil Cuellar (Head Coach)",
    "status": "active",
    "plan": "Membresía Mensual",
    "startDate": "2026-08-01",
    "renewalDate": "2026-09-15",
    "birthDate": "1999-06-16",
    "paidServiceTitle": "Membresía Mensual Atleta (200 Bs.)",
    "serviceFeeBs": 200,
    "billingCycle": "mensual",
    "paymentStatus": "pagado",
    "amountPaidBs": 200,
    "pendingBalanceBs": 0,
    "lastPaymentDate": "2026-08-05",
    "nextDueDate": "2026-09-01",
    "additionalServices": [
      "Chequeo Antropométrico"
    ],
    "snackBarBalanceBs": 0,
    "physicalGoal": "Composición corporal, masa muscular magra y resistencia",
    "weightKg": 87,
    "heightM": 1.83,
    "workoutLevel": "Principiante",
    "currentRoutineExercises": "1. Calistenia funcional básica y movilidad\n2. Sentadillas con peso corporal (4x15)\n3. Flexiones en barra inclinada (4x10)\n4. Planchas isométricas (4x45s)\n5. Caminata activa y respiración nasal",
    "nutritionPlan": "ElectroHidra + Nutrición Anti-inflamatoria",
    "currentDiet": "Comida rápida al mediodía, picoteo dulce por ansiedad en la tarde.",
    "prescribedDiet": "Plan Base Anti-inflamatorio. Snacks de frutos secos y batido verde. Cena ligera antes de las 20:00.",
    "allergiesOrRestrictions": "Ninguna",
    "eatingDisordersOrIssues": "Sin trastornos diagnosticados.",
    "neuroticAndStressFactors": "Manejo de estrés cotidiano.",
    "spiritualIntention": "Cultivar autodominio y templanza en momentos de alta presión profesional.",
    "mentorshipNotes": "Atleta integrado al escuadrón Paz-Beta. Compromiso regular en sesiones CristoFit Camp.",
    "attendanceHistory": [
      {
        "date": "2026-08-20",
        "attended": true,
        "notes": "Sesión CristoFit Camp - 100%"
      },
      {
        "date": "2026-08-22",
        "attended": true,
        "notes": "Entrenamiento de fuerza y calistenia"
      },
      {
        "date": "2026-08-24",
        "attended": true,
        "notes": "Movilidad articular y Buteyko"
      }
    ],
    "assessments": [
      {
        "date": "2026-08-01",
        "weightKg": 88.8,
        "heightM": 1.83,
        "imc": 26.5,
        "notes": "Evaluación inicial de ciclo"
      },
      {
        "date": "2026-08-22",
        "weightKg": 87,
        "heightM": 1.83,
        "imc": 26,
        "notes": "Progreso notable en resistencia y fuerza"
      }
    ],
    "escuadronId": "Paz-Beta",
    "phase": "1 - Iniciación",
    "isVipProfile": false,
    "hubConsumption": {
      "snackBar": false,
      "merchandise": false,
      "preventiveMedicine": false
    },
    "avatarUrl": ""
  },
  {
    "id": "std-42",
    "name": "Tatiana Osinaga",
    "phone": "+59174516198",
    "email": "tatiana.osinaga@templefit.com",
    "instructorAssigned": "Paulo Alberto Gil Cuellar (Head Coach)",
    "status": "active",
    "plan": "Membresía Mensual",
    "startDate": "2026-08-01",
    "renewalDate": "2026-09-15",
    "birthDate": "2000-07-19",
    "paidServiceTitle": "Membresía Mensual Atleta (200 Bs.)",
    "serviceFeeBs": 200,
    "billingCycle": "mensual",
    "paymentStatus": "pagado",
    "amountPaidBs": 200,
    "pendingBalanceBs": 0,
    "lastPaymentDate": "2026-08-05",
    "nextDueDate": "2026-09-01",
    "additionalServices": [
      "Snack Bar Prepago",
      "ElectroHidra"
    ],
    "snackBarBalanceBs": 50,
    "physicalGoal": "Fuerza funcional, calistenia y pérdida de 4kg de grasa",
    "weightKg": 61,
    "heightM": 1.61,
    "workoutLevel": "Principiante",
    "currentRoutineExercises": "1. Muscle-ups y fondos lastrados (4x6)\n2. Dominadas con agarre supino (4x10)\n3. Pistols asistidos (4x8 p/lado)\n4. Flexiones pliométricas (4x12)\n5. Sparring técnico y Buteyko",
    "nutritionPlan": "Catering Saludable Abuela Fit + Hidratación Activa",
    "currentDiet": "Dieta hipercalórica desordenada, bajo consumo de agua.",
    "prescribedDiet": "Catering Abuela Fit + 3L de agua alcalina con electrolitos naturales. Suplemento con glutamina.",
    "allergiesOrRestrictions": "Ninguna",
    "eatingDisordersOrIssues": "Sin trastornos diagnosticados.",
    "neuroticAndStressFactors": "Tensión cervical por jornadas frente a pantalla y cortisol elevado",
    "spiritualIntention": "Consolidar la disciplina del despertar a las 05:30 AM con oración y enfoque.",
    "mentorshipNotes": "Atleta integrado al escuadrón Paz-Gamma. Compromiso regular en sesiones CristoFit Camp.",
    "attendanceHistory": [
      {
        "date": "2026-08-20",
        "attended": true,
        "notes": "Sesión CristoFit Camp - 100%"
      },
      {
        "date": "2026-08-22",
        "attended": true,
        "notes": "Entrenamiento de fuerza y calistenia"
      },
      {
        "date": "2026-08-24",
        "attended": true,
        "notes": "Movilidad articular y Buteyko"
      }
    ],
    "assessments": [
      {
        "date": "2026-08-01",
        "weightKg": 62.8,
        "heightM": 1.61,
        "imc": 24.2,
        "notes": "Evaluación inicial de ciclo"
      },
      {
        "date": "2026-08-22",
        "weightKg": 61,
        "heightM": 1.61,
        "imc": 23.5,
        "notes": "Progreso notable en resistencia y fuerza"
      }
    ],
    "escuadronId": "Paz-Gamma",
    "phase": "1 - Iniciación",
    "isVipProfile": false,
    "hubConsumption": {
      "snackBar": true,
      "merchandise": true,
      "preventiveMedicine": false
    },
    "avatarUrl": ""
  },
  {
    "id": "std-43",
    "name": "Emilio Landívar",
    "phone": "+59174599917",
    "email": "emilio.landivar@templefit.com",
    "instructorAssigned": "Paulo Alberto Gil Cuellar (Head Coach)",
    "status": "active",
    "plan": "Membresía Mensual",
    "startDate": "2026-08-01",
    "renewalDate": "2026-09-15",
    "birthDate": "2001-08-22",
    "paidServiceTitle": "Membresía Mensual Atleta (200 Bs.)",
    "serviceFeeBs": 200,
    "billingCycle": "mensual",
    "paymentStatus": "pagado",
    "amountPaidBs": 200,
    "pendingBalanceBs": 0,
    "lastPaymentDate": "2026-08-05",
    "nextDueDate": "2026-09-01",
    "additionalServices": [
      "Chequeo Antropométrico"
    ],
    "snackBarBalanceBs": 0,
    "physicalGoal": "Composición corporal, masa muscular magra y resistencia",
    "weightKg": 68.5,
    "heightM": 1.64,
    "workoutLevel": "Principiante",
    "currentRoutineExercises": "1. Flexiones regulares y declinadas (4x15)\n2. Remo invertido en paralelas (4x10)\n3. Estocadas dinámicas (4x12)\n4. Elevación de piernas en barra (4x10)\n5. Cardio CristoFit Camp 06:00 AM",
    "nutritionPlan": "Smoothie de Salomón + Plan Detox 0 Azúcar",
    "currentDiet": "Salteo de comidas, exceso de gaseosas y azúcar refinada.",
    "prescribedDiet": "Detox 21 Días sin azúcar. Smoothie de Salomón matutino, ensaladas verdes y pescado fresco.",
    "allergiesOrRestrictions": "Ninguna",
    "eatingDisordersOrIssues": "Sin trastornos diagnosticados.",
    "neuroticAndStressFactors": "Manejo de estrés cotidiano.",
    "spiritualIntention": "Superar la pereza mental y liderar con el ejemplo en su hogar y trabajo.",
    "mentorshipNotes": "Atleta integrado al escuadrón Paz-Delta. Compromiso regular en sesiones CristoFit Camp.",
    "attendanceHistory": [
      {
        "date": "2026-08-20",
        "attended": true,
        "notes": "Sesión CristoFit Camp - 100%"
      },
      {
        "date": "2026-08-22",
        "attended": true,
        "notes": "Entrenamiento de fuerza y calistenia"
      },
      {
        "date": "2026-08-24",
        "attended": true,
        "notes": "Movilidad articular y Buteyko"
      }
    ],
    "assessments": [
      {
        "date": "2026-08-01",
        "weightKg": 70.3,
        "heightM": 1.64,
        "imc": 26.1,
        "notes": "Evaluación inicial de ciclo"
      },
      {
        "date": "2026-08-22",
        "weightKg": 68.5,
        "heightM": 1.64,
        "imc": 25.5,
        "notes": "Progreso notable en resistencia y fuerza"
      }
    ],
    "escuadronId": "Paz-Delta",
    "phase": "1 - Iniciación",
    "isVipProfile": false,
    "hubConsumption": {
      "snackBar": false,
      "merchandise": false,
      "preventiveMedicine": false
    },
    "avatarUrl": ""
  },
  {
    "id": "std-44",
    "name": "Carla Eguez",
    "phone": "+59174683636",
    "email": "carla.eguez@templefit.com",
    "instructorAssigned": "Paulo Alberto Gil Cuellar (Head Coach)",
    "status": "active",
    "plan": "Membresía Mensual",
    "startDate": "2026-08-01",
    "renewalDate": "2026-09-15",
    "birthDate": "2002-09-25",
    "paidServiceTitle": "Membresía Mensual Atleta (200 Bs.)",
    "serviceFeeBs": 200,
    "billingCycle": "mensual",
    "paymentStatus": "pagado",
    "amountPaidBs": 200,
    "pendingBalanceBs": 0,
    "lastPaymentDate": "2026-08-05",
    "nextDueDate": "2026-09-01",
    "additionalServices": [
      "Snack Bar Prepago",
      "ElectroHidra"
    ],
    "snackBarBalanceBs": 0,
    "physicalGoal": "Fuerza funcional, calistenia y pérdida de 4kg de grasa",
    "weightKg": 76,
    "heightM": 1.67,
    "workoutLevel": "Intermedio",
    "currentRoutineExercises": "1. Trabajo de core y estabilidad lumbar\n2. Flexiones hindúes y pike pushups (4x10)\n3. Saltos de cuerda (5 rondas x 2 min)\n4. Dominadas escapulares (4x12)\n5. Hidratación con ElectroHidra",
    "nutritionPlan": "Protocolo Salomón + Proteína Limpia",
    "currentDiet": "Desayuno con café y pan, almuerzo irregular, cenas pesadas.",
    "prescribedDiet": "06:00 AM: ElectroHidra 1L. 08:00 AM: Bowl de Elías. Almuerzo anti-inflamatorio con proteína limpia y verduras.",
    "allergiesOrRestrictions": "Ninguna",
    "eatingDisordersOrIssues": "Tendencia a picoteo por estrés en horario laboral",
    "neuroticAndStressFactors": "Manejo de estrés cotidiano.",
    "spiritualIntention": "Buscar paz interior frente al estrés laboral mediante devocionales y Buteyko.",
    "mentorshipNotes": "Atleta integrado al escuadrón Gedeón-1. Compromiso regular en sesiones CristoFit Camp.",
    "attendanceHistory": [
      {
        "date": "2026-08-20",
        "attended": true,
        "notes": "Sesión CristoFit Camp - 100%"
      },
      {
        "date": "2026-08-22",
        "attended": true,
        "notes": "Entrenamiento de fuerza y calistenia"
      },
      {
        "date": "2026-08-24",
        "attended": true,
        "notes": "Movilidad articular y Buteyko"
      }
    ],
    "assessments": [
      {
        "date": "2026-08-01",
        "weightKg": 77.8,
        "heightM": 1.67,
        "imc": 27.9,
        "notes": "Evaluación inicial de ciclo"
      },
      {
        "date": "2026-08-22",
        "weightKg": 76,
        "heightM": 1.67,
        "imc": 27.3,
        "notes": "Progreso notable en resistencia y fuerza"
      }
    ],
    "escuadronId": "Gedeón-1",
    "phase": "2 - Desarrollo",
    "isVipProfile": false,
    "hubConsumption": {
      "snackBar": true,
      "merchandise": false,
      "preventiveMedicine": true
    },
    "avatarUrl": ""
  },
  {
    "id": "std-45",
    "name": "Gonzalo Soria",
    "phone": "+59174767355",
    "email": "gonzalo.soria@templefit.com",
    "instructorAssigned": "Paulo Alberto Gil Cuellar (Head Coach)",
    "status": "active",
    "plan": "Trimestral Atleta",
    "startDate": "2026-08-01",
    "renewalDate": "2026-09-15",
    "birthDate": "1988-10-01",
    "paidServiceTitle": "Trimestral Atleta Continuo (500 Bs. / 3 meses)",
    "serviceFeeBs": 500,
    "billingCycle": "trimestral",
    "paymentStatus": "pagado",
    "amountPaidBs": 500,
    "pendingBalanceBs": 0,
    "lastPaymentDate": "2026-08-05",
    "nextDueDate": "2026-09-01",
    "additionalServices": [
      "Chequeo Antropométrico"
    ],
    "snackBarBalanceBs": 50,
    "physicalGoal": "Composición corporal, masa muscular magra y resistencia",
    "weightKg": 82,
    "heightM": 1.7,
    "workoutLevel": "Intermedio",
    "currentRoutineExercises": "1. Dominadas estrictas (4x8)\n2. Fondos en paralelas (4x10)\n3. Sentadilla búlgara (4x12)\n4. Flexiones diamante (4x15)\n5. Buteyko y cardio matutino 06:00 AM",
    "nutritionPlan": "ElectroHidra + Nutrición Anti-inflamatoria",
    "currentDiet": "Comida rápida al mediodía, picoteo dulce por ansiedad en la tarde.",
    "prescribedDiet": "Plan Base Anti-inflamatorio. Snacks de frutos secos y batido verde. Cena ligera antes de las 20:00.",
    "allergiesOrRestrictions": "Sensibilidad a la lactosa",
    "eatingDisordersOrIssues": "Sin trastornos diagnosticados.",
    "neuroticAndStressFactors": "Tensión cervical por jornadas frente a pantalla y cortisol elevado",
    "spiritualIntention": "Liderar su escuadrón con humildad, servicio y constancia innegociable.",
    "mentorshipNotes": "Atleta integrado al escuadrón Gedeón-2. Compromiso regular en sesiones CristoFit Camp.",
    "attendanceHistory": [
      {
        "date": "2026-08-20",
        "attended": true,
        "notes": "Sesión CristoFit Camp - 100%"
      },
      {
        "date": "2026-08-22",
        "attended": true,
        "notes": "Entrenamiento de fuerza y calistenia"
      },
      {
        "date": "2026-08-24",
        "attended": true,
        "notes": "Movilidad articular y Buteyko"
      }
    ],
    "assessments": [
      {
        "date": "2026-08-01",
        "weightKg": 83.8,
        "heightM": 1.7,
        "imc": 29,
        "notes": "Evaluación inicial de ciclo"
      },
      {
        "date": "2026-08-22",
        "weightKg": 82,
        "heightM": 1.7,
        "imc": 28.4,
        "notes": "Progreso notable en resistencia y fuerza"
      }
    ],
    "escuadronId": "Gedeón-2",
    "phase": "2 - Desarrollo",
    "isVipProfile": false,
    "hubConsumption": {
      "snackBar": false,
      "merchandise": true,
      "preventiveMedicine": false
    },
    "avatarUrl": ""
  },
  {
    "id": "std-46",
    "name": "Flavia Chávez",
    "phone": "+59174851074",
    "email": "flavia.chavez@templefit.com",
    "instructorAssigned": "Paulo Alberto Gil Cuellar (Head Coach)",
    "status": "active",
    "plan": "Trimestral Atleta",
    "startDate": "2026-08-01",
    "renewalDate": "2026-09-15",
    "birthDate": "1989-11-04",
    "paidServiceTitle": "Trimestral Atleta Continuo (500 Bs. / 3 meses)",
    "serviceFeeBs": 500,
    "billingCycle": "trimestral",
    "paymentStatus": "pagado",
    "amountPaidBs": 500,
    "pendingBalanceBs": 0,
    "lastPaymentDate": "2026-08-05",
    "nextDueDate": "2026-09-01",
    "additionalServices": [
      "Snack Bar Prepago",
      "ElectroHidra"
    ],
    "snackBarBalanceBs": 0,
    "physicalGoal": "Fuerza funcional, calistenia y pérdida de 4kg de grasa",
    "weightKg": 57.5,
    "heightM": 1.73,
    "workoutLevel": "Intermedio",
    "currentRoutineExercises": "1. Calistenia funcional básica y movilidad\n2. Sentadillas con peso corporal (4x15)\n3. Flexiones en barra inclinada (4x10)\n4. Planchas isométricas (4x45s)\n5. Caminata activa y respiración nasal",
    "nutritionPlan": "Catering Saludable Abuela Fit + Hidratación Activa",
    "currentDiet": "Dieta hipercalórica desordenada, bajo consumo de agua.",
    "prescribedDiet": "Catering Abuela Fit + 3L de agua alcalina con electrolitos naturales. Suplemento con glutamina.",
    "allergiesOrRestrictions": "Ninguna",
    "eatingDisordersOrIssues": "Sin trastornos diagnosticados.",
    "neuroticAndStressFactors": "Manejo de estrés cotidiano.",
    "spiritualIntention": "Alinear cuerpo, mente y espíritu como templo del Creador (1 Corintios 6:19).",
    "mentorshipNotes": "Atleta integrado al escuadrón Gedeón-3. Compromiso regular en sesiones CristoFit Camp.",
    "attendanceHistory": [
      {
        "date": "2026-08-20",
        "attended": true,
        "notes": "Sesión CristoFit Camp - 100%"
      },
      {
        "date": "2026-08-22",
        "attended": true,
        "notes": "Entrenamiento de fuerza y calistenia"
      },
      {
        "date": "2026-08-24",
        "attended": true,
        "notes": "Movilidad articular y Buteyko"
      }
    ],
    "assessments": [
      {
        "date": "2026-08-01",
        "weightKg": 59.3,
        "heightM": 1.73,
        "imc": 19.8,
        "notes": "Evaluación inicial de ciclo"
      },
      {
        "date": "2026-08-22",
        "weightKg": 57.5,
        "heightM": 1.73,
        "imc": 19.2,
        "notes": "Progreso notable en resistencia y fuerza"
      }
    ],
    "escuadronId": "Gedeón-3",
    "phase": "2 - Desarrollo",
    "isVipProfile": false,
    "hubConsumption": {
      "snackBar": true,
      "merchandise": false,
      "preventiveMedicine": false
    },
    "avatarUrl": ""
  },
  {
    "id": "std-47",
    "name": "Martín Urey",
    "phone": "+59174934793",
    "email": "martin.urey@templefit.com",
    "instructorAssigned": "Paulo Alberto Gil Cuellar (Head Coach)",
    "status": "active",
    "plan": "Trimestral Atleta",
    "startDate": "2026-08-01",
    "renewalDate": "2026-09-15",
    "birthDate": "1990-12-07",
    "paidServiceTitle": "Trimestral Atleta Continuo (500 Bs. / 3 meses)",
    "serviceFeeBs": 500,
    "billingCycle": "trimestral",
    "paymentStatus": "pagado",
    "amountPaidBs": 500,
    "pendingBalanceBs": 0,
    "lastPaymentDate": "2026-08-05",
    "nextDueDate": "2026-09-01",
    "additionalServices": [
      "Chequeo Antropométrico"
    ],
    "snackBarBalanceBs": 0,
    "physicalGoal": "Composición corporal, masa muscular magra y resistencia",
    "weightKg": 65,
    "heightM": 1.76,
    "workoutLevel": "Intermedio",
    "currentRoutineExercises": "1. Muscle-ups y fondos lastrados (4x6)\n2. Dominadas con agarre supino (4x10)\n3. Pistols asistidos (4x8 p/lado)\n4. Flexiones pliométricas (4x12)\n5. Sparring técnico y Buteyko",
    "nutritionPlan": "Smoothie de Salomón + Plan Detox 0 Azúcar",
    "currentDiet": "Salteo de comidas, exceso de gaseosas y azúcar refinada.",
    "prescribedDiet": "Detox 21 Días sin azúcar. Smoothie de Salomón matutino, ensaladas verdes y pescado fresco.",
    "allergiesOrRestrictions": "Ninguna",
    "eatingDisordersOrIssues": "Sin trastornos diagnosticados.",
    "neuroticAndStressFactors": "Manejo de estrés cotidiano.",
    "spiritualIntention": "Cultivar autodominio y templanza en momentos de alta presión profesional.",
    "mentorshipNotes": "Atleta integrado al escuadrón Gedeón-4. Compromiso regular en sesiones CristoFit Camp.",
    "attendanceHistory": [
      {
        "date": "2026-08-20",
        "attended": true,
        "notes": "Sesión CristoFit Camp - 100%"
      },
      {
        "date": "2026-08-22",
        "attended": true,
        "notes": "Entrenamiento de fuerza y calistenia"
      },
      {
        "date": "2026-08-24",
        "attended": true,
        "notes": "Movilidad articular y Buteyko"
      }
    ],
    "assessments": [
      {
        "date": "2026-08-01",
        "weightKg": 66.8,
        "heightM": 1.76,
        "imc": 21.6,
        "notes": "Evaluación inicial de ciclo"
      },
      {
        "date": "2026-08-22",
        "weightKg": 65,
        "heightM": 1.76,
        "imc": 21,
        "notes": "Progreso notable en resistencia y fuerza"
      }
    ],
    "escuadronId": "Gedeón-4",
    "phase": "2 - Desarrollo",
    "isVipProfile": false,
    "hubConsumption": {
      "snackBar": false,
      "merchandise": false,
      "preventiveMedicine": false
    },
    "avatarUrl": ""
  },
  {
    "id": "std-48",
    "name": "Lorena Montaño",
    "phone": "+59175018512",
    "email": "lorena.montano@templefit.com",
    "instructorAssigned": "Paulo Alberto Gil Cuellar (Head Coach)",
    "status": "expiring",
    "plan": "Trimestral Atleta",
    "startDate": "2026-08-01",
    "renewalDate": "2026-08-28",
    "birthDate": "1991-01-10",
    "paidServiceTitle": "Trimestral Atleta Continuo (500 Bs. / 3 meses)",
    "serviceFeeBs": 500,
    "billingCycle": "trimestral",
    "paymentStatus": "pendiente",
    "amountPaidBs": 0,
    "pendingBalanceBs": 500,
    "lastPaymentDate": "",
    "nextDueDate": "2026-09-01",
    "additionalServices": [
      "Snack Bar Prepago",
      "ElectroHidra"
    ],
    "snackBarBalanceBs": 50,
    "physicalGoal": "Fuerza funcional, calistenia y pérdida de 4kg de grasa",
    "weightKg": 71,
    "heightM": 1.79,
    "workoutLevel": "Intermedio",
    "currentRoutineExercises": "1. Flexiones regulares y declinadas (4x15)\n2. Remo invertido en paralelas (4x10)\n3. Estocadas dinámicas (4x12)\n4. Elevación de piernas en barra (4x10)\n5. Cardio CristoFit Camp 06:00 AM",
    "nutritionPlan": "Protocolo Salomón + Proteína Limpia",
    "currentDiet": "Desayuno con café y pan, almuerzo irregular, cenas pesadas.",
    "prescribedDiet": "06:00 AM: ElectroHidra 1L. 08:00 AM: Bowl de Elías. Almuerzo anti-inflamatorio con proteína limpia y verduras.",
    "allergiesOrRestrictions": "Ninguna",
    "eatingDisordersOrIssues": "Tendencia a picoteo por estrés en horario laboral",
    "neuroticAndStressFactors": "Tensión cervical por jornadas frente a pantalla y cortisol elevado",
    "spiritualIntention": "Consolidar la disciplina del despertar a las 05:30 AM con oración y enfoque.",
    "mentorshipNotes": "Atleta integrado al escuadrón Gedeón-5. Compromiso regular en sesiones CristoFit Camp.",
    "attendanceHistory": [
      {
        "date": "2026-08-20",
        "attended": true,
        "notes": "Sesión CristoFit Camp - 100%"
      },
      {
        "date": "2026-08-22",
        "attended": true,
        "notes": "Entrenamiento de fuerza y calistenia"
      },
      {
        "date": "2026-08-24",
        "attended": true,
        "notes": "Movilidad articular y Buteyko"
      }
    ],
    "assessments": [
      {
        "date": "2026-08-01",
        "weightKg": 72.8,
        "heightM": 1.79,
        "imc": 22.7,
        "notes": "Evaluación inicial de ciclo"
      },
      {
        "date": "2026-08-22",
        "weightKg": 71,
        "heightM": 1.79,
        "imc": 22.2,
        "notes": "Progreso notable en resistencia y fuerza"
      }
    ],
    "escuadronId": "Gedeón-5",
    "phase": "2 - Desarrollo",
    "isVipProfile": false,
    "hubConsumption": {
      "snackBar": true,
      "merchandise": true,
      "preventiveMedicine": true
    },
    "avatarUrl": ""
  },
  {
    "id": "std-49",
    "name": "Eduardo Farah",
    "phone": "+59175102231",
    "email": "eduardo.farah@templefit.com",
    "instructorAssigned": "Paulo Alberto Gil Cuellar (Head Coach)",
    "status": "active",
    "plan": "Trimestral Atleta",
    "startDate": "2026-08-01",
    "renewalDate": "2026-09-15",
    "birthDate": "1992-02-13",
    "paidServiceTitle": "Trimestral Atleta Continuo (500 Bs. / 3 meses)",
    "serviceFeeBs": 500,
    "billingCycle": "trimestral",
    "paymentStatus": "pagado",
    "amountPaidBs": 500,
    "pendingBalanceBs": 0,
    "lastPaymentDate": "2026-08-05",
    "nextDueDate": "2026-09-01",
    "additionalServices": [
      "Chequeo Antropométrico"
    ],
    "snackBarBalanceBs": 0,
    "physicalGoal": "Composición corporal, masa muscular magra y resistencia",
    "weightKg": 78.5,
    "heightM": 1.82,
    "workoutLevel": "Intermedio",
    "currentRoutineExercises": "1. Trabajo de core y estabilidad lumbar\n2. Flexiones hindúes y pike pushups (4x10)\n3. Saltos de cuerda (5 rondas x 2 min)\n4. Dominadas escapulares (4x12)\n5. Hidratación con ElectroHidra",
    "nutritionPlan": "ElectroHidra + Nutrición Anti-inflamatoria",
    "currentDiet": "Comida rápida al mediodía, picoteo dulce por ansiedad en la tarde.",
    "prescribedDiet": "Plan Base Anti-inflamatorio. Snacks de frutos secos y batido verde. Cena ligera antes de las 20:00.",
    "allergiesOrRestrictions": "Ninguna",
    "eatingDisordersOrIssues": "Sin trastornos diagnosticados.",
    "neuroticAndStressFactors": "Manejo de estrés cotidiano.",
    "spiritualIntention": "Superar la pereza mental y liderar con el ejemplo en su hogar y trabajo.",
    "mentorshipNotes": "Atleta integrado al escuadrón Gedeón-6. Compromiso regular en sesiones CristoFit Camp.",
    "attendanceHistory": [
      {
        "date": "2026-08-20",
        "attended": true,
        "notes": "Sesión CristoFit Camp - 100%"
      },
      {
        "date": "2026-08-22",
        "attended": true,
        "notes": "Entrenamiento de fuerza y calistenia"
      },
      {
        "date": "2026-08-24",
        "attended": true,
        "notes": "Movilidad articular y Buteyko"
      }
    ],
    "assessments": [
      {
        "date": "2026-08-01",
        "weightKg": 80.3,
        "heightM": 1.82,
        "imc": 24.2,
        "notes": "Evaluación inicial de ciclo"
      },
      {
        "date": "2026-08-22",
        "weightKg": 78.5,
        "heightM": 1.82,
        "imc": 23.7,
        "notes": "Progreso notable en resistencia y fuerza"
      }
    ],
    "escuadronId": "Gedeón-6",
    "phase": "2 - Desarrollo",
    "isVipProfile": false,
    "hubConsumption": {
      "snackBar": false,
      "merchandise": false,
      "preventiveMedicine": false
    },
    "avatarUrl": ""
  },
  {
    "id": "std-50",
    "name": "Ximena Tórrez",
    "phone": "+59175185950",
    "email": "ximena.torrez@templefit.com",
    "instructorAssigned": "Paulo Alberto Gil Cuellar (Head Coach)",
    "status": "active",
    "plan": "Trimestral Atleta",
    "startDate": "2026-08-01",
    "renewalDate": "2026-09-15",
    "birthDate": "1993-03-16",
    "paidServiceTitle": "Trimestral Atleta Continuo (500 Bs. / 3 meses)",
    "serviceFeeBs": 500,
    "billingCycle": "trimestral",
    "paymentStatus": "pagado",
    "amountPaidBs": 500,
    "pendingBalanceBs": 0,
    "lastPaymentDate": "2026-08-05",
    "nextDueDate": "2026-09-01",
    "additionalServices": [
      "Snack Bar Prepago",
      "ElectroHidra"
    ],
    "snackBarBalanceBs": 0,
    "physicalGoal": "Fuerza funcional, calistenia y pérdida de 4kg de grasa",
    "weightKg": 86,
    "heightM": 1.6,
    "workoutLevel": "Intermedio",
    "currentRoutineExercises": "1. Dominadas estrictas (4x8)\n2. Fondos en paralelas (4x10)\n3. Sentadilla búlgara (4x12)\n4. Flexiones diamante (4x15)\n5. Buteyko y cardio matutino 06:00 AM",
    "nutritionPlan": "Catering Saludable Abuela Fit + Hidratación Activa",
    "currentDiet": "Dieta hipercalórica desordenada, bajo consumo de agua.",
    "prescribedDiet": "Catering Abuela Fit + 3L de agua alcalina con electrolitos naturales. Suplemento con glutamina.",
    "allergiesOrRestrictions": "Sensibilidad a la lactosa",
    "eatingDisordersOrIssues": "Sin trastornos diagnosticados.",
    "neuroticAndStressFactors": "Manejo de estrés cotidiano.",
    "spiritualIntention": "Buscar paz interior frente al estrés laboral mediante devocionales y Buteyko.",
    "mentorshipNotes": "Atleta integrado al escuadrón Gedeón-7. Compromiso regular en sesiones CristoFit Camp.",
    "attendanceHistory": [
      {
        "date": "2026-08-20",
        "attended": true,
        "notes": "Sesión CristoFit Camp - 100%"
      },
      {
        "date": "2026-08-22",
        "attended": true,
        "notes": "Entrenamiento de fuerza y calistenia"
      },
      {
        "date": "2026-08-24",
        "attended": true,
        "notes": "Movilidad articular y Buteyko"
      }
    ],
    "assessments": [
      {
        "date": "2026-08-01",
        "weightKg": 87.8,
        "heightM": 1.6,
        "imc": 34.3,
        "notes": "Evaluación inicial de ciclo"
      },
      {
        "date": "2026-08-22",
        "weightKg": 86,
        "heightM": 1.6,
        "imc": 33.6,
        "notes": "Progreso notable en resistencia y fuerza"
      }
    ],
    "escuadronId": "Gedeón-7",
    "phase": "2 - Desarrollo",
    "isVipProfile": false,
    "hubConsumption": {
      "snackBar": true,
      "merchandise": false,
      "preventiveMedicine": false
    },
    "avatarUrl": ""
  },
  {
    "id": "std-51",
    "name": "Guillermo Prado",
    "phone": "+59175269669",
    "email": "guillermo.prado@templefit.com",
    "instructorAssigned": "Paulo Alberto Gil Cuellar (Head Coach)",
    "status": "active",
    "plan": "Trimestral Atleta",
    "startDate": "2026-08-01",
    "renewalDate": "2026-09-15",
    "birthDate": "1994-04-19",
    "paidServiceTitle": "Trimestral Atleta Continuo (500 Bs. / 3 meses)",
    "serviceFeeBs": 500,
    "billingCycle": "trimestral",
    "paymentStatus": "pagado",
    "amountPaidBs": 500,
    "pendingBalanceBs": 0,
    "lastPaymentDate": "2026-08-05",
    "nextDueDate": "2026-09-01",
    "additionalServices": [
      "Chequeo Antropométrico"
    ],
    "snackBarBalanceBs": 50,
    "physicalGoal": "Composición corporal, masa muscular magra y resistencia",
    "weightKg": 60,
    "heightM": 1.63,
    "workoutLevel": "Intermedio",
    "currentRoutineExercises": "1. Calistenia funcional básica y movilidad\n2. Sentadillas con peso corporal (4x15)\n3. Flexiones en barra inclinada (4x10)\n4. Planchas isométricas (4x45s)\n5. Caminata activa y respiración nasal",
    "nutritionPlan": "Smoothie de Salomón + Plan Detox 0 Azúcar",
    "currentDiet": "Salteo de comidas, exceso de gaseosas y azúcar refinada.",
    "prescribedDiet": "Detox 21 Días sin azúcar. Smoothie de Salomón matutino, ensaladas verdes y pescado fresco.",
    "allergiesOrRestrictions": "Ninguna",
    "eatingDisordersOrIssues": "Sin trastornos diagnosticados.",
    "neuroticAndStressFactors": "Tensión cervical por jornadas frente a pantalla y cortisol elevado",
    "spiritualIntention": "Liderar su escuadrón con humildad, servicio y constancia innegociable.",
    "mentorshipNotes": "Atleta integrado al escuadrón Gedeón-8. Compromiso regular en sesiones CristoFit Camp.",
    "attendanceHistory": [
      {
        "date": "2026-08-20",
        "attended": true,
        "notes": "Sesión CristoFit Camp - 100%"
      },
      {
        "date": "2026-08-22",
        "attended": true,
        "notes": "Entrenamiento de fuerza y calistenia"
      },
      {
        "date": "2026-08-24",
        "attended": true,
        "notes": "Movilidad articular y Buteyko"
      }
    ],
    "assessments": [
      {
        "date": "2026-08-01",
        "weightKg": 61.8,
        "heightM": 1.63,
        "imc": 23.3,
        "notes": "Evaluación inicial de ciclo"
      },
      {
        "date": "2026-08-22",
        "weightKg": 60,
        "heightM": 1.63,
        "imc": 22.6,
        "notes": "Progreso notable en resistencia y fuerza"
      }
    ],
    "escuadronId": "Gedeón-8",
    "phase": "2 - Desarrollo",
    "isVipProfile": false,
    "hubConsumption": {
      "snackBar": false,
      "merchandise": true,
      "preventiveMedicine": false
    },
    "avatarUrl": ""
  },
  {
    "id": "std-52",
    "name": "Verónica Loza",
    "phone": "+59175353388",
    "email": "veronica.loza@templefit.com",
    "instructorAssigned": "Paulo Alberto Gil Cuellar (Head Coach)",
    "status": "active",
    "plan": "Trimestral Atleta",
    "startDate": "2026-08-01",
    "renewalDate": "2026-09-15",
    "birthDate": "1995-05-22",
    "paidServiceTitle": "Trimestral Atleta Continuo (500 Bs. / 3 meses)",
    "serviceFeeBs": 500,
    "billingCycle": "trimestral",
    "paymentStatus": "pagado",
    "amountPaidBs": 500,
    "pendingBalanceBs": 0,
    "lastPaymentDate": "2026-08-05",
    "nextDueDate": "2026-09-01",
    "additionalServices": [
      "Snack Bar Prepago",
      "ElectroHidra"
    ],
    "snackBarBalanceBs": 0,
    "physicalGoal": "Fuerza funcional, calistenia y pérdida de 4kg de grasa",
    "weightKg": 67.5,
    "heightM": 1.66,
    "workoutLevel": "Avanzado",
    "currentRoutineExercises": "1. Muscle-ups y fondos lastrados (4x6)\n2. Dominadas con agarre supino (4x10)\n3. Pistols asistidos (4x8 p/lado)\n4. Flexiones pliométricas (4x12)\n5. Sparring técnico y Buteyko",
    "nutritionPlan": "Protocolo Salomón + Proteína Limpia",
    "currentDiet": "Desayuno con café y pan, almuerzo irregular, cenas pesadas.",
    "prescribedDiet": "06:00 AM: ElectroHidra 1L. 08:00 AM: Bowl de Elías. Almuerzo anti-inflamatorio con proteína limpia y verduras.",
    "allergiesOrRestrictions": "Ninguna",
    "eatingDisordersOrIssues": "Tendencia a picoteo por estrés en horario laboral",
    "neuroticAndStressFactors": "Manejo de estrés cotidiano.",
    "spiritualIntention": "Alinear cuerpo, mente y espíritu como templo del Creador (1 Corintios 6:19).",
    "mentorshipNotes": "Atleta integrado al escuadrón Cristo-1. Compromiso regular en sesiones CristoFit Camp.",
    "attendanceHistory": [
      {
        "date": "2026-08-20",
        "attended": true,
        "notes": "Sesión CristoFit Camp - 100%"
      },
      {
        "date": "2026-08-22",
        "attended": true,
        "notes": "Entrenamiento de fuerza y calistenia"
      },
      {
        "date": "2026-08-24",
        "attended": true,
        "notes": "Movilidad articular y Buteyko"
      }
    ],
    "assessments": [
      {
        "date": "2026-08-01",
        "weightKg": 69.3,
        "heightM": 1.66,
        "imc": 25.1,
        "notes": "Evaluación inicial de ciclo"
      },
      {
        "date": "2026-08-22",
        "weightKg": 67.5,
        "heightM": 1.66,
        "imc": 24.5,
        "notes": "Progreso notable en resistencia y fuerza"
      }
    ],
    "escuadronId": "Cristo-1",
    "phase": "3 - Perfeccionamiento",
    "isVipProfile": false,
    "hubConsumption": {
      "snackBar": true,
      "merchandise": false,
      "preventiveMedicine": true
    },
    "avatarUrl": ""
  },
  {
    "id": "std-53",
    "name": "Cristian Menacho",
    "phone": "+59175437107",
    "email": "cristian.menacho@templefit.com",
    "instructorAssigned": "Paulo Alberto Gil Cuellar (Head Coach)",
    "status": "active",
    "plan": "Trimestral Atleta",
    "startDate": "2026-08-01",
    "renewalDate": "2026-09-15",
    "birthDate": "1996-06-25",
    "paidServiceTitle": "Trimestral Atleta Continuo (500 Bs. / 3 meses)",
    "serviceFeeBs": 500,
    "billingCycle": "trimestral",
    "paymentStatus": "pagado",
    "amountPaidBs": 500,
    "pendingBalanceBs": 0,
    "lastPaymentDate": "2026-08-05",
    "nextDueDate": "2026-09-01",
    "additionalServices": [
      "Chequeo Antropométrico"
    ],
    "snackBarBalanceBs": 0,
    "physicalGoal": "Composición corporal, masa muscular magra y resistencia",
    "weightKg": 75,
    "heightM": 1.69,
    "workoutLevel": "Avanzado",
    "currentRoutineExercises": "1. Flexiones regulares y declinadas (4x15)\n2. Remo invertido en paralelas (4x10)\n3. Estocadas dinámicas (4x12)\n4. Elevación de piernas en barra (4x10)\n5. Cardio CristoFit Camp 06:00 AM",
    "nutritionPlan": "ElectroHidra + Nutrición Anti-inflamatoria",
    "currentDiet": "Comida rápida al mediodía, picoteo dulce por ansiedad en la tarde.",
    "prescribedDiet": "Plan Base Anti-inflamatorio. Snacks de frutos secos y batido verde. Cena ligera antes de las 20:00.",
    "allergiesOrRestrictions": "Ninguna",
    "eatingDisordersOrIssues": "Sin trastornos diagnosticados.",
    "neuroticAndStressFactors": "Manejo de estrés cotidiano.",
    "spiritualIntention": "Cultivar autodominio y templanza en momentos de alta presión profesional.",
    "mentorshipNotes": "Atleta integrado al escuadrón Cristo-2. Compromiso regular en sesiones CristoFit Camp.",
    "attendanceHistory": [
      {
        "date": "2026-08-20",
        "attended": true,
        "notes": "Sesión CristoFit Camp - 100%"
      },
      {
        "date": "2026-08-22",
        "attended": true,
        "notes": "Entrenamiento de fuerza y calistenia"
      },
      {
        "date": "2026-08-24",
        "attended": true,
        "notes": "Movilidad articular y Buteyko"
      }
    ],
    "assessments": [
      {
        "date": "2026-08-01",
        "weightKg": 76.8,
        "heightM": 1.69,
        "imc": 26.9,
        "notes": "Evaluación inicial de ciclo"
      },
      {
        "date": "2026-08-22",
        "weightKg": 75,
        "heightM": 1.69,
        "imc": 26.3,
        "notes": "Progreso notable en resistencia y fuerza"
      }
    ],
    "escuadronId": "Cristo-2",
    "phase": "3 - Perfeccionamiento",
    "isVipProfile": false,
    "hubConsumption": {
      "snackBar": false,
      "merchandise": false,
      "preventiveMedicine": false
    },
    "avatarUrl": ""
  },
  {
    "id": "std-54",
    "name": "Cecilia Justiniano",
    "phone": "+59175520826",
    "email": "cecilia.justiniano@templefit.com",
    "instructorAssigned": "Paulo Alberto Gil Cuellar (Head Coach)",
    "status": "active",
    "plan": "Trimestral Atleta",
    "startDate": "2026-08-01",
    "renewalDate": "2026-09-15",
    "birthDate": "1997-07-01",
    "paidServiceTitle": "Trimestral Atleta Continuo (500 Bs. / 3 meses)",
    "serviceFeeBs": 500,
    "billingCycle": "trimestral",
    "paymentStatus": "pagado",
    "amountPaidBs": 500,
    "pendingBalanceBs": 0,
    "lastPaymentDate": "2026-08-05",
    "nextDueDate": "2026-09-01",
    "additionalServices": [
      "Snack Bar Prepago",
      "ElectroHidra"
    ],
    "snackBarBalanceBs": 50,
    "physicalGoal": "Fuerza funcional, calistenia y pérdida de 4kg de grasa",
    "weightKg": 81,
    "heightM": 1.72,
    "workoutLevel": "Avanzado",
    "currentRoutineExercises": "1. Trabajo de core y estabilidad lumbar\n2. Flexiones hindúes y pike pushups (4x10)\n3. Saltos de cuerda (5 rondas x 2 min)\n4. Dominadas escapulares (4x12)\n5. Hidratación con ElectroHidra",
    "nutritionPlan": "Catering Saludable Abuela Fit + Hidratación Activa",
    "currentDiet": "Dieta hipercalórica desordenada, bajo consumo de agua.",
    "prescribedDiet": "Catering Abuela Fit + 3L de agua alcalina con electrolitos naturales. Suplemento con glutamina.",
    "allergiesOrRestrictions": "Ninguna",
    "eatingDisordersOrIssues": "Sin trastornos diagnosticados.",
    "neuroticAndStressFactors": "Tensión cervical por jornadas frente a pantalla y cortisol elevado",
    "spiritualIntention": "Consolidar la disciplina del despertar a las 05:30 AM con oración y enfoque.",
    "mentorshipNotes": "Atleta integrado al escuadrón Cristo-3. Compromiso regular en sesiones CristoFit Camp.",
    "attendanceHistory": [
      {
        "date": "2026-08-20",
        "attended": true,
        "notes": "Sesión CristoFit Camp - 100%"
      },
      {
        "date": "2026-08-22",
        "attended": true,
        "notes": "Entrenamiento de fuerza y calistenia"
      },
      {
        "date": "2026-08-24",
        "attended": true,
        "notes": "Movilidad articular y Buteyko"
      }
    ],
    "assessments": [
      {
        "date": "2026-08-01",
        "weightKg": 82.8,
        "heightM": 1.72,
        "imc": 28,
        "notes": "Evaluación inicial de ciclo"
      },
      {
        "date": "2026-08-22",
        "weightKg": 81,
        "heightM": 1.72,
        "imc": 27.4,
        "notes": "Progreso notable en resistencia y fuerza"
      }
    ],
    "escuadronId": "Cristo-3",
    "phase": "3 - Perfeccionamiento",
    "isVipProfile": false,
    "hubConsumption": {
      "snackBar": true,
      "merchandise": true,
      "preventiveMedicine": false
    },
    "avatarUrl": ""
  },
  {
    "id": "std-55",
    "name": "Hernán Callau",
    "phone": "+59175604545",
    "email": "hernan.callau@templefit.com",
    "instructorAssigned": "Paulo Alberto Gil Cuellar (Head Coach)",
    "status": "active",
    "plan": "Trimestral Atleta",
    "startDate": "2026-08-01",
    "renewalDate": "2026-09-15",
    "birthDate": "1998-08-04",
    "paidServiceTitle": "Trimestral Atleta Continuo (500 Bs. / 3 meses)",
    "serviceFeeBs": 500,
    "billingCycle": "trimestral",
    "paymentStatus": "pagado",
    "amountPaidBs": 500,
    "pendingBalanceBs": 0,
    "lastPaymentDate": "2026-08-05",
    "nextDueDate": "2026-09-01",
    "additionalServices": [
      "Chequeo Antropométrico"
    ],
    "snackBarBalanceBs": 0,
    "physicalGoal": "Composición corporal, masa muscular magra y resistencia",
    "weightKg": 56.5,
    "heightM": 1.75,
    "workoutLevel": "Avanzado",
    "currentRoutineExercises": "1. Dominadas estrictas (4x8)\n2. Fondos en paralelas (4x10)\n3. Sentadilla búlgara (4x12)\n4. Flexiones diamante (4x15)\n5. Buteyko y cardio matutino 06:00 AM",
    "nutritionPlan": "Smoothie de Salomón + Plan Detox 0 Azúcar",
    "currentDiet": "Salteo de comidas, exceso de gaseosas y azúcar refinada.",
    "prescribedDiet": "Detox 21 Días sin azúcar. Smoothie de Salomón matutino, ensaladas verdes y pescado fresco.",
    "allergiesOrRestrictions": "Sensibilidad a la lactosa",
    "eatingDisordersOrIssues": "Sin trastornos diagnosticados.",
    "neuroticAndStressFactors": "Manejo de estrés cotidiano.",
    "spiritualIntention": "Superar la pereza mental y liderar con el ejemplo en su hogar y trabajo.",
    "mentorshipNotes": "Atleta integrado al escuadrón Cristo-4. Compromiso regular en sesiones CristoFit Camp.",
    "attendanceHistory": [
      {
        "date": "2026-08-20",
        "attended": true,
        "notes": "Sesión CristoFit Camp - 100%"
      },
      {
        "date": "2026-08-22",
        "attended": true,
        "notes": "Entrenamiento de fuerza y calistenia"
      },
      {
        "date": "2026-08-24",
        "attended": true,
        "notes": "Movilidad articular y Buteyko"
      }
    ],
    "assessments": [
      {
        "date": "2026-08-01",
        "weightKg": 58.3,
        "heightM": 1.75,
        "imc": 19,
        "notes": "Evaluación inicial de ciclo"
      },
      {
        "date": "2026-08-22",
        "weightKg": 56.5,
        "heightM": 1.75,
        "imc": 18.4,
        "notes": "Progreso notable en resistencia y fuerza"
      }
    ],
    "escuadronId": "Cristo-4",
    "phase": "3 - Perfeccionamiento",
    "isVipProfile": false,
    "hubConsumption": {
      "snackBar": false,
      "merchandise": false,
      "preventiveMedicine": false
    },
    "avatarUrl": ""
  },
  {
    "id": "std-56",
    "name": "Andrea Saucedo",
    "phone": "+59175688264",
    "email": "andrea.saucedo@templefit.com",
    "instructorAssigned": "Paulo Alberto Gil Cuellar (Head Coach)",
    "status": "active",
    "plan": "Trimestral Atleta",
    "startDate": "2026-08-01",
    "renewalDate": "2026-09-15",
    "birthDate": "1999-09-07",
    "paidServiceTitle": "Trimestral Atleta Continuo (500 Bs. / 3 meses)",
    "serviceFeeBs": 500,
    "billingCycle": "trimestral",
    "paymentStatus": "pagado",
    "amountPaidBs": 500,
    "pendingBalanceBs": 0,
    "lastPaymentDate": "2026-08-05",
    "nextDueDate": "2026-09-01",
    "additionalServices": [
      "Snack Bar Prepago",
      "ElectroHidra"
    ],
    "snackBarBalanceBs": 0,
    "physicalGoal": "Fuerza funcional, calistenia y pérdida de 4kg de grasa",
    "weightKg": 64,
    "heightM": 1.78,
    "workoutLevel": "Avanzado",
    "currentRoutineExercises": "1. Calistenia funcional básica y movilidad\n2. Sentadillas con peso corporal (4x15)\n3. Flexiones en barra inclinada (4x10)\n4. Planchas isométricas (4x45s)\n5. Caminata activa y respiración nasal",
    "nutritionPlan": "Protocolo Salomón + Proteína Limpia",
    "currentDiet": "Desayuno con café y pan, almuerzo irregular, cenas pesadas.",
    "prescribedDiet": "06:00 AM: ElectroHidra 1L. 08:00 AM: Bowl de Elías. Almuerzo anti-inflamatorio con proteína limpia y verduras.",
    "allergiesOrRestrictions": "Ninguna",
    "eatingDisordersOrIssues": "Tendencia a picoteo por estrés en horario laboral",
    "neuroticAndStressFactors": "Manejo de estrés cotidiano.",
    "spiritualIntention": "Buscar paz interior frente al estrés laboral mediante devocionales y Buteyko.",
    "mentorshipNotes": "Atleta integrado al escuadrón Cristo-5. Compromiso regular en sesiones CristoFit Camp.",
    "attendanceHistory": [
      {
        "date": "2026-08-20",
        "attended": true,
        "notes": "Sesión CristoFit Camp - 100%"
      },
      {
        "date": "2026-08-22",
        "attended": true,
        "notes": "Entrenamiento de fuerza y calistenia"
      },
      {
        "date": "2026-08-24",
        "attended": true,
        "notes": "Movilidad articular y Buteyko"
      }
    ],
    "assessments": [
      {
        "date": "2026-08-01",
        "weightKg": 65.8,
        "heightM": 1.78,
        "imc": 20.8,
        "notes": "Evaluación inicial de ciclo"
      },
      {
        "date": "2026-08-22",
        "weightKg": 64,
        "heightM": 1.78,
        "imc": 20.2,
        "notes": "Progreso notable en resistencia y fuerza"
      }
    ],
    "escuadronId": "Cristo-5",
    "phase": "3 - Perfeccionamiento",
    "isVipProfile": false,
    "hubConsumption": {
      "snackBar": true,
      "merchandise": false,
      "preventiveMedicine": true
    },
    "avatarUrl": ""
  },
  {
    "id": "std-57",
    "name": "Raúl Antezana",
    "phone": "+59175771983",
    "email": "raul.antezana@templefit.com",
    "instructorAssigned": "Paulo Alberto Gil Cuellar (Head Coach)",
    "status": "active",
    "plan": "Trimestral Atleta",
    "startDate": "2026-08-01",
    "renewalDate": "2026-09-15",
    "birthDate": "2000-10-10",
    "paidServiceTitle": "Trimestral Atleta Continuo (500 Bs. / 3 meses)",
    "serviceFeeBs": 500,
    "billingCycle": "trimestral",
    "paymentStatus": "pagado",
    "amountPaidBs": 500,
    "pendingBalanceBs": 0,
    "lastPaymentDate": "2026-08-05",
    "nextDueDate": "2026-09-01",
    "additionalServices": [
      "Chequeo Antropométrico"
    ],
    "snackBarBalanceBs": 50,
    "physicalGoal": "Composición corporal, masa muscular magra y resistencia",
    "weightKg": 70,
    "heightM": 1.81,
    "workoutLevel": "Avanzado",
    "currentRoutineExercises": "1. Muscle-ups y fondos lastrados (4x6)\n2. Dominadas con agarre supino (4x10)\n3. Pistols asistidos (4x8 p/lado)\n4. Flexiones pliométricas (4x12)\n5. Sparring técnico y Buteyko",
    "nutritionPlan": "ElectroHidra + Nutrición Anti-inflamatoria",
    "currentDiet": "Comida rápida al mediodía, picoteo dulce por ansiedad en la tarde.",
    "prescribedDiet": "Plan Base Anti-inflamatorio. Snacks de frutos secos y batido verde. Cena ligera antes de las 20:00.",
    "allergiesOrRestrictions": "Ninguna",
    "eatingDisordersOrIssues": "Sin trastornos diagnosticados.",
    "neuroticAndStressFactors": "Tensión cervical por jornadas frente a pantalla y cortisol elevado",
    "spiritualIntention": "Liderar su escuadrón con humildad, servicio y constancia innegociable.",
    "mentorshipNotes": "Atleta integrado al escuadrón Cristo-6. Compromiso regular en sesiones CristoFit Camp.",
    "attendanceHistory": [
      {
        "date": "2026-08-20",
        "attended": true,
        "notes": "Sesión CristoFit Camp - 100%"
      },
      {
        "date": "2026-08-22",
        "attended": true,
        "notes": "Entrenamiento de fuerza y calistenia"
      },
      {
        "date": "2026-08-24",
        "attended": true,
        "notes": "Movilidad articular y Buteyko"
      }
    ],
    "assessments": [
      {
        "date": "2026-08-01",
        "weightKg": 71.8,
        "heightM": 1.81,
        "imc": 21.9,
        "notes": "Evaluación inicial de ciclo"
      },
      {
        "date": "2026-08-22",
        "weightKg": 70,
        "heightM": 1.81,
        "imc": 21.4,
        "notes": "Progreso notable en resistencia y fuerza"
      }
    ],
    "escuadronId": "Cristo-6",
    "phase": "3 - Perfeccionamiento",
    "isVipProfile": false,
    "hubConsumption": {
      "snackBar": false,
      "merchandise": true,
      "preventiveMedicine": false
    },
    "avatarUrl": ""
  },
  {
    "id": "std-58",
    "name": "Fabiola Marinkovic",
    "phone": "+59175855702",
    "email": "fabiola.marinkovic@templefit.com",
    "instructorAssigned": "Paulo Alberto Gil Cuellar (Head Coach)",
    "status": "active",
    "plan": "Coaching 1 a 1",
    "startDate": "2026-08-01",
    "renewalDate": "2026-09-15",
    "birthDate": "2001-11-13",
    "paidServiceTitle": "Coaching Personalizado 1 a 1 (450 Bs.)",
    "serviceFeeBs": 450,
    "billingCycle": "mensual",
    "paymentStatus": "pagado",
    "amountPaidBs": 450,
    "pendingBalanceBs": 0,
    "lastPaymentDate": "2026-08-05",
    "nextDueDate": "2026-09-01",
    "additionalServices": [
      "Snack Bar Prepago",
      "ElectroHidra"
    ],
    "snackBarBalanceBs": 0,
    "physicalGoal": "Fuerza funcional, calistenia y pérdida de 4kg de grasa",
    "weightKg": 77.5,
    "heightM": 1.84,
    "workoutLevel": "Avanzado",
    "currentRoutineExercises": "1. Flexiones regulares y declinadas (4x15)\n2. Remo invertido en paralelas (4x10)\n3. Estocadas dinámicas (4x12)\n4. Elevación de piernas en barra (4x10)\n5. Cardio CristoFit Camp 06:00 AM",
    "nutritionPlan": "Catering Saludable Abuela Fit + Hidratación Activa",
    "currentDiet": "Dieta hipercalórica desordenada, bajo consumo de agua.",
    "prescribedDiet": "Catering Abuela Fit + 3L de agua alcalina con electrolitos naturales. Suplemento con glutamina.",
    "allergiesOrRestrictions": "Ninguna",
    "eatingDisordersOrIssues": "Sin trastornos diagnosticados.",
    "neuroticAndStressFactors": "Manejo de estrés cotidiano.",
    "spiritualIntention": "Alinear cuerpo, mente y espíritu como templo del Creador (1 Corintios 6:19).",
    "mentorshipNotes": "Atleta integrado al escuadrón Cristo-7. Compromiso regular en sesiones CristoFit Camp.",
    "attendanceHistory": [
      {
        "date": "2026-08-20",
        "attended": true,
        "notes": "Sesión CristoFit Camp - 100%"
      },
      {
        "date": "2026-08-22",
        "attended": true,
        "notes": "Entrenamiento de fuerza y calistenia"
      },
      {
        "date": "2026-08-24",
        "attended": true,
        "notes": "Movilidad articular y Buteyko"
      }
    ],
    "assessments": [
      {
        "date": "2026-08-01",
        "weightKg": 79.3,
        "heightM": 1.84,
        "imc": 23.4,
        "notes": "Evaluación inicial de ciclo"
      },
      {
        "date": "2026-08-22",
        "weightKg": 77.5,
        "heightM": 1.84,
        "imc": 22.9,
        "notes": "Progreso notable en resistencia y fuerza"
      }
    ],
    "escuadronId": "Cristo-7",
    "phase": "3 - Perfeccionamiento",
    "isVipProfile": false,
    "hubConsumption": {
      "snackBar": true,
      "merchandise": false,
      "preventiveMedicine": false
    },
    "avatarUrl": ""
  },
  {
    "id": "std-59",
    "name": "Gustavo Vaca",
    "phone": "+59175939421",
    "email": "gustavo.vaca@templefit.com",
    "instructorAssigned": "Paulo Alberto Gil Cuellar (Head Coach)",
    "status": "active",
    "plan": "Coaching 1 a 1",
    "startDate": "2026-08-01",
    "renewalDate": "2026-09-15",
    "birthDate": "2002-12-16",
    "paidServiceTitle": "Coaching Personalizado 1 a 1 (450 Bs.)",
    "serviceFeeBs": 450,
    "billingCycle": "mensual",
    "paymentStatus": "pagado",
    "amountPaidBs": 450,
    "pendingBalanceBs": 0,
    "lastPaymentDate": "2026-08-05",
    "nextDueDate": "2026-09-01",
    "additionalServices": [
      "Chequeo Antropométrico"
    ],
    "snackBarBalanceBs": 0,
    "physicalGoal": "Composición corporal, masa muscular magra y resistencia",
    "weightKg": 85,
    "heightM": 1.62,
    "workoutLevel": "Avanzado",
    "currentRoutineExercises": "1. Trabajo de core y estabilidad lumbar\n2. Flexiones hindúes y pike pushups (4x10)\n3. Saltos de cuerda (5 rondas x 2 min)\n4. Dominadas escapulares (4x12)\n5. Hidratación con ElectroHidra",
    "nutritionPlan": "Smoothie de Salomón + Plan Detox 0 Azúcar",
    "currentDiet": "Salteo de comidas, exceso de gaseosas y azúcar refinada.",
    "prescribedDiet": "Detox 21 Días sin azúcar. Smoothie de Salomón matutino, ensaladas verdes y pescado fresco.",
    "allergiesOrRestrictions": "Ninguna",
    "eatingDisordersOrIssues": "Sin trastornos diagnosticados.",
    "neuroticAndStressFactors": "Manejo de estrés cotidiano.",
    "spiritualIntention": "Cultivar autodominio y templanza en momentos de alta presión profesional.",
    "mentorshipNotes": "Atleta integrado al escuadrón Cristo-8. Compromiso regular en sesiones CristoFit Camp.",
    "attendanceHistory": [
      {
        "date": "2026-08-20",
        "attended": true,
        "notes": "Sesión CristoFit Camp - 100%"
      },
      {
        "date": "2026-08-22",
        "attended": true,
        "notes": "Entrenamiento de fuerza y calistenia"
      },
      {
        "date": "2026-08-24",
        "attended": true,
        "notes": "Movilidad articular y Buteyko"
      }
    ],
    "assessments": [
      {
        "date": "2026-08-01",
        "weightKg": 86.8,
        "heightM": 1.62,
        "imc": 33.1,
        "notes": "Evaluación inicial de ciclo"
      },
      {
        "date": "2026-08-22",
        "weightKg": 85,
        "heightM": 1.62,
        "imc": 32.4,
        "notes": "Progreso notable en resistencia y fuerza"
      }
    ],
    "escuadronId": "Cristo-8",
    "phase": "3 - Perfeccionamiento",
    "isVipProfile": false,
    "hubConsumption": {
      "snackBar": false,
      "merchandise": false,
      "preventiveMedicine": false
    },
    "avatarUrl": ""
  },
  {
    "id": "std-60",
    "name": "Noelia Dorado",
    "phone": "+59176023140",
    "email": "noelia.dorado@templefit.com",
    "instructorAssigned": "Paulo Alberto Gil Cuellar (Head Coach)",
    "status": "active",
    "plan": "Coaching 1 a 1",
    "startDate": "2026-08-01",
    "renewalDate": "2026-09-15",
    "birthDate": "1988-01-19",
    "paidServiceTitle": "Coaching Personalizado 1 a 1 (450 Bs.)",
    "serviceFeeBs": 450,
    "billingCycle": "mensual",
    "paymentStatus": "pagado",
    "amountPaidBs": 450,
    "pendingBalanceBs": 0,
    "lastPaymentDate": "2026-08-05",
    "nextDueDate": "2026-09-01",
    "additionalServices": [
      "Snack Bar Prepago",
      "ElectroHidra"
    ],
    "snackBarBalanceBs": 50,
    "physicalGoal": "Fuerza funcional, calistenia y pérdida de 4kg de grasa",
    "weightKg": 59,
    "heightM": 1.65,
    "workoutLevel": "Principiante",
    "currentRoutineExercises": "1. Dominadas estrictas (4x8)\n2. Fondos en paralelas (4x10)\n3. Sentadilla búlgara (4x12)\n4. Flexiones diamante (4x15)\n5. Buteyko y cardio matutino 06:00 AM",
    "nutritionPlan": "Protocolo Salomón + Proteína Limpia",
    "currentDiet": "Desayuno con café y pan, almuerzo irregular, cenas pesadas.",
    "prescribedDiet": "06:00 AM: ElectroHidra 1L. 08:00 AM: Bowl de Elías. Almuerzo anti-inflamatorio con proteína limpia y verduras.",
    "allergiesOrRestrictions": "Sensibilidad a la lactosa",
    "eatingDisordersOrIssues": "Tendencia a picoteo por estrés en horario laboral",
    "neuroticAndStressFactors": "Tensión cervical por jornadas frente a pantalla y cortisol elevado",
    "spiritualIntention": "Consolidar la disciplina del despertar a las 05:30 AM con oración y enfoque.",
    "mentorshipNotes": "Atleta integrado al escuadrón Paz-Alfa. Compromiso regular en sesiones CristoFit Camp.",
    "attendanceHistory": [
      {
        "date": "2026-08-20",
        "attended": true,
        "notes": "Sesión CristoFit Camp - 100%"
      },
      {
        "date": "2026-08-22",
        "attended": true,
        "notes": "Entrenamiento de fuerza y calistenia"
      },
      {
        "date": "2026-08-24",
        "attended": true,
        "notes": "Movilidad articular y Buteyko"
      }
    ],
    "assessments": [
      {
        "date": "2026-08-01",
        "weightKg": 60.8,
        "heightM": 1.65,
        "imc": 22.3,
        "notes": "Evaluación inicial de ciclo"
      },
      {
        "date": "2026-08-22",
        "weightKg": 59,
        "heightM": 1.65,
        "imc": 21.7,
        "notes": "Progreso notable en resistencia y fuerza"
      }
    ],
    "escuadronId": "Paz-Alfa",
    "phase": "1 - Iniciación",
    "isVipProfile": false,
    "hubConsumption": {
      "snackBar": true,
      "merchandise": true,
      "preventiveMedicine": true
    },
    "avatarUrl": ""
  },
  {
    "id": "std-61",
    "name": "Pablo Escalante",
    "phone": "+59176106859",
    "email": "pablo.escalante@templefit.com",
    "instructorAssigned": "Paulo Alberto Gil Cuellar (Head Coach)",
    "status": "active",
    "plan": "Coaching 1 a 1",
    "startDate": "2026-08-01",
    "renewalDate": "2026-09-15",
    "birthDate": "1989-02-22",
    "paidServiceTitle": "Coaching Personalizado 1 a 1 (450 Bs.)",
    "serviceFeeBs": 450,
    "billingCycle": "mensual",
    "paymentStatus": "pagado",
    "amountPaidBs": 450,
    "pendingBalanceBs": 0,
    "lastPaymentDate": "2026-08-05",
    "nextDueDate": "2026-09-01",
    "additionalServices": [
      "Chequeo Antropométrico"
    ],
    "snackBarBalanceBs": 0,
    "physicalGoal": "Composición corporal, masa muscular magra y resistencia",
    "weightKg": 66.5,
    "heightM": 1.68,
    "workoutLevel": "Principiante",
    "currentRoutineExercises": "1. Calistenia funcional básica y movilidad\n2. Sentadillas con peso corporal (4x15)\n3. Flexiones en barra inclinada (4x10)\n4. Planchas isométricas (4x45s)\n5. Caminata activa y respiración nasal",
    "nutritionPlan": "ElectroHidra + Nutrición Anti-inflamatoria",
    "currentDiet": "Comida rápida al mediodía, picoteo dulce por ansiedad en la tarde.",
    "prescribedDiet": "Plan Base Anti-inflamatorio. Snacks de frutos secos y batido verde. Cena ligera antes de las 20:00.",
    "allergiesOrRestrictions": "Ninguna",
    "eatingDisordersOrIssues": "Sin trastornos diagnosticados.",
    "neuroticAndStressFactors": "Manejo de estrés cotidiano.",
    "spiritualIntention": "Superar la pereza mental y liderar con el ejemplo en su hogar y trabajo.",
    "mentorshipNotes": "Atleta integrado al escuadrón Paz-Beta. Compromiso regular en sesiones CristoFit Camp.",
    "attendanceHistory": [
      {
        "date": "2026-08-20",
        "attended": true,
        "notes": "Sesión CristoFit Camp - 100%"
      },
      {
        "date": "2026-08-22",
        "attended": true,
        "notes": "Entrenamiento de fuerza y calistenia"
      },
      {
        "date": "2026-08-24",
        "attended": true,
        "notes": "Movilidad articular y Buteyko"
      }
    ],
    "assessments": [
      {
        "date": "2026-08-01",
        "weightKg": 68.3,
        "heightM": 1.68,
        "imc": 24.2,
        "notes": "Evaluación inicial de ciclo"
      },
      {
        "date": "2026-08-22",
        "weightKg": 66.5,
        "heightM": 1.68,
        "imc": 23.6,
        "notes": "Progreso notable en resistencia y fuerza"
      }
    ],
    "escuadronId": "Paz-Beta",
    "phase": "1 - Iniciación",
    "isVipProfile": false,
    "hubConsumption": {
      "snackBar": false,
      "merchandise": false,
      "preventiveMedicine": false
    },
    "avatarUrl": ""
  },
  {
    "id": "std-62",
    "name": "Jimena Callaú",
    "phone": "+59176190578",
    "email": "jimena.callau@templefit.com",
    "instructorAssigned": "Paulo Alberto Gil Cuellar (Head Coach)",
    "status": "active",
    "plan": "Coaching 1 a 1",
    "startDate": "2026-08-01",
    "renewalDate": "2026-09-15",
    "birthDate": "1990-03-25",
    "paidServiceTitle": "Coaching Personalizado 1 a 1 (450 Bs.)",
    "serviceFeeBs": 450,
    "billingCycle": "mensual",
    "paymentStatus": "pagado",
    "amountPaidBs": 450,
    "pendingBalanceBs": 0,
    "lastPaymentDate": "2026-08-05",
    "nextDueDate": "2026-09-01",
    "additionalServices": [
      "Snack Bar Prepago",
      "ElectroHidra"
    ],
    "snackBarBalanceBs": 0,
    "physicalGoal": "Fuerza funcional, calistenia y pérdida de 4kg de grasa",
    "weightKg": 74,
    "heightM": 1.71,
    "workoutLevel": "Principiante",
    "currentRoutineExercises": "1. Muscle-ups y fondos lastrados (4x6)\n2. Dominadas con agarre supino (4x10)\n3. Pistols asistidos (4x8 p/lado)\n4. Flexiones pliométricas (4x12)\n5. Sparring técnico y Buteyko",
    "nutritionPlan": "Catering Saludable Abuela Fit + Hidratación Activa",
    "currentDiet": "Dieta hipercalórica desordenada, bajo consumo de agua.",
    "prescribedDiet": "Catering Abuela Fit + 3L de agua alcalina con electrolitos naturales. Suplemento con glutamina.",
    "allergiesOrRestrictions": "Ninguna",
    "eatingDisordersOrIssues": "Sin trastornos diagnosticados.",
    "neuroticAndStressFactors": "Manejo de estrés cotidiano.",
    "spiritualIntention": "Buscar paz interior frente al estrés laboral mediante devocionales y Buteyko.",
    "mentorshipNotes": "Atleta integrado al escuadrón Paz-Gamma. Compromiso regular en sesiones CristoFit Camp.",
    "attendanceHistory": [
      {
        "date": "2026-08-20",
        "attended": true,
        "notes": "Sesión CristoFit Camp - 100%"
      },
      {
        "date": "2026-08-22",
        "attended": true,
        "notes": "Entrenamiento de fuerza y calistenia"
      },
      {
        "date": "2026-08-24",
        "attended": true,
        "notes": "Movilidad articular y Buteyko"
      }
    ],
    "assessments": [
      {
        "date": "2026-08-01",
        "weightKg": 75.8,
        "heightM": 1.71,
        "imc": 25.9,
        "notes": "Evaluación inicial de ciclo"
      },
      {
        "date": "2026-08-22",
        "weightKg": 74,
        "heightM": 1.71,
        "imc": 25.3,
        "notes": "Progreso notable en resistencia y fuerza"
      }
    ],
    "escuadronId": "Paz-Gamma",
    "phase": "1 - Iniciación",
    "isVipProfile": false,
    "hubConsumption": {
      "snackBar": true,
      "merchandise": false,
      "preventiveMedicine": false
    },
    "avatarUrl": ""
  },
  {
    "id": "std-63",
    "name": "David Viruez",
    "phone": "+59176274297",
    "email": "david.viruez@templefit.com",
    "instructorAssigned": "Paulo Alberto Gil Cuellar (Head Coach)",
    "status": "active",
    "plan": "CristoFit Camp",
    "startDate": "2026-08-01",
    "renewalDate": "2026-09-15",
    "birthDate": "1991-04-01",
    "paidServiceTitle": "CristoFit Camp Sábados Intensivo (150 Bs.)",
    "serviceFeeBs": 150,
    "billingCycle": "mensual",
    "paymentStatus": "pagado",
    "amountPaidBs": 150,
    "pendingBalanceBs": 0,
    "lastPaymentDate": "2026-08-05",
    "nextDueDate": "2026-09-01",
    "additionalServices": [
      "Chequeo Antropométrico"
    ],
    "snackBarBalanceBs": 50,
    "physicalGoal": "Composición corporal, masa muscular magra y resistencia",
    "weightKg": 80,
    "heightM": 1.74,
    "workoutLevel": "Principiante",
    "currentRoutineExercises": "1. Flexiones regulares y declinadas (4x15)\n2. Remo invertido en paralelas (4x10)\n3. Estocadas dinámicas (4x12)\n4. Elevación de piernas en barra (4x10)\n5. Cardio CristoFit Camp 06:00 AM",
    "nutritionPlan": "Smoothie de Salomón + Plan Detox 0 Azúcar",
    "currentDiet": "Salteo de comidas, exceso de gaseosas y azúcar refinada.",
    "prescribedDiet": "Detox 21 Días sin azúcar. Smoothie de Salomón matutino, ensaladas verdes y pescado fresco.",
    "allergiesOrRestrictions": "Ninguna",
    "eatingDisordersOrIssues": "Sin trastornos diagnosticados.",
    "neuroticAndStressFactors": "Tensión cervical por jornadas frente a pantalla y cortisol elevado",
    "spiritualIntention": "Liderar su escuadrón con humildad, servicio y constancia innegociable.",
    "mentorshipNotes": "Atleta integrado al escuadrón Paz-Delta. Compromiso regular en sesiones CristoFit Camp.",
    "attendanceHistory": [
      {
        "date": "2026-08-20",
        "attended": true,
        "notes": "Sesión CristoFit Camp - 100%"
      },
      {
        "date": "2026-08-22",
        "attended": true,
        "notes": "Entrenamiento de fuerza y calistenia"
      },
      {
        "date": "2026-08-24",
        "attended": true,
        "notes": "Movilidad articular y Buteyko"
      }
    ],
    "assessments": [
      {
        "date": "2026-08-01",
        "weightKg": 81.8,
        "heightM": 1.74,
        "imc": 27,
        "notes": "Evaluación inicial de ciclo"
      },
      {
        "date": "2026-08-22",
        "weightKg": 80,
        "heightM": 1.74,
        "imc": 26.4,
        "notes": "Progreso notable en resistencia y fuerza"
      }
    ],
    "escuadronId": "Paz-Delta",
    "phase": "1 - Iniciación",
    "isVipProfile": false,
    "hubConsumption": {
      "snackBar": false,
      "merchandise": true,
      "preventiveMedicine": false
    },
    "avatarUrl": ""
  },
  {
    "id": "std-64",
    "name": "Vanesa Añez",
    "phone": "+59176358016",
    "email": "vanesa.anez@templefit.com",
    "instructorAssigned": "Paulo Alberto Gil Cuellar (Head Coach)",
    "status": "active",
    "plan": "CristoFit Camp",
    "startDate": "2026-08-01",
    "renewalDate": "2026-09-15",
    "birthDate": "1992-05-04",
    "paidServiceTitle": "CristoFit Camp Sábados Intensivo (150 Bs.)",
    "serviceFeeBs": 150,
    "billingCycle": "mensual",
    "paymentStatus": "pagado",
    "amountPaidBs": 150,
    "pendingBalanceBs": 0,
    "lastPaymentDate": "2026-08-05",
    "nextDueDate": "2026-09-01",
    "additionalServices": [
      "Snack Bar Prepago",
      "ElectroHidra"
    ],
    "snackBarBalanceBs": 0,
    "physicalGoal": "Fuerza funcional, calistenia y pérdida de 4kg de grasa",
    "weightKg": 55.5,
    "heightM": 1.77,
    "workoutLevel": "Intermedio",
    "currentRoutineExercises": "1. Trabajo de core y estabilidad lumbar\n2. Flexiones hindúes y pike pushups (4x10)\n3. Saltos de cuerda (5 rondas x 2 min)\n4. Dominadas escapulares (4x12)\n5. Hidratación con ElectroHidra",
    "nutritionPlan": "Protocolo Salomón + Proteína Limpia",
    "currentDiet": "Desayuno con café y pan, almuerzo irregular, cenas pesadas.",
    "prescribedDiet": "06:00 AM: ElectroHidra 1L. 08:00 AM: Bowl de Elías. Almuerzo anti-inflamatorio con proteína limpia y verduras.",
    "allergiesOrRestrictions": "Ninguna",
    "eatingDisordersOrIssues": "Tendencia a picoteo por estrés en horario laboral",
    "neuroticAndStressFactors": "Manejo de estrés cotidiano.",
    "spiritualIntention": "Alinear cuerpo, mente y espíritu como templo del Creador (1 Corintios 6:19).",
    "mentorshipNotes": "Atleta integrado al escuadrón Gedeón-1. Compromiso regular en sesiones CristoFit Camp.",
    "attendanceHistory": [
      {
        "date": "2026-08-20",
        "attended": true,
        "notes": "Sesión CristoFit Camp - 100%"
      },
      {
        "date": "2026-08-22",
        "attended": true,
        "notes": "Entrenamiento de fuerza y calistenia"
      },
      {
        "date": "2026-08-24",
        "attended": true,
        "notes": "Movilidad articular y Buteyko"
      }
    ],
    "assessments": [
      {
        "date": "2026-08-01",
        "weightKg": 57.3,
        "heightM": 1.77,
        "imc": 18.3,
        "notes": "Evaluación inicial de ciclo"
      },
      {
        "date": "2026-08-22",
        "weightKg": 55.5,
        "heightM": 1.77,
        "imc": 17.7,
        "notes": "Progreso notable en resistencia y fuerza"
      }
    ],
    "escuadronId": "Gedeón-1",
    "phase": "2 - Desarrollo",
    "isVipProfile": false,
    "hubConsumption": {
      "snackBar": true,
      "merchandise": false,
      "preventiveMedicine": true
    },
    "avatarUrl": ""
  },
  {
    "id": "std-65",
    "name": "Marcelo Yáñez",
    "phone": "+59176441735",
    "email": "marcelo.yanez@templefit.com",
    "instructorAssigned": "Paulo Alberto Gil Cuellar (Head Coach)",
    "status": "active",
    "plan": "CristoFit Camp",
    "startDate": "2026-08-01",
    "renewalDate": "2026-09-15",
    "birthDate": "1993-06-07",
    "paidServiceTitle": "CristoFit Camp Sábados Intensivo (150 Bs.)",
    "serviceFeeBs": 150,
    "billingCycle": "mensual",
    "paymentStatus": "pagado",
    "amountPaidBs": 150,
    "pendingBalanceBs": 0,
    "lastPaymentDate": "2026-08-05",
    "nextDueDate": "2026-09-01",
    "additionalServices": [
      "Chequeo Antropométrico"
    ],
    "snackBarBalanceBs": 0,
    "physicalGoal": "Composición corporal, masa muscular magra y resistencia",
    "weightKg": 63,
    "heightM": 1.8,
    "workoutLevel": "Intermedio",
    "currentRoutineExercises": "1. Dominadas estrictas (4x8)\n2. Fondos en paralelas (4x10)\n3. Sentadilla búlgara (4x12)\n4. Flexiones diamante (4x15)\n5. Buteyko y cardio matutino 06:00 AM",
    "nutritionPlan": "ElectroHidra + Nutrición Anti-inflamatoria",
    "currentDiet": "Comida rápida al mediodía, picoteo dulce por ansiedad en la tarde.",
    "prescribedDiet": "Plan Base Anti-inflamatorio. Snacks de frutos secos y batido verde. Cena ligera antes de las 20:00.",
    "allergiesOrRestrictions": "Sensibilidad a la lactosa",
    "eatingDisordersOrIssues": "Sin trastornos diagnosticados.",
    "neuroticAndStressFactors": "Manejo de estrés cotidiano.",
    "spiritualIntention": "Cultivar autodominio y templanza en momentos de alta presión profesional.",
    "mentorshipNotes": "Atleta integrado al escuadrón Gedeón-2. Compromiso regular en sesiones CristoFit Camp.",
    "attendanceHistory": [
      {
        "date": "2026-08-20",
        "attended": true,
        "notes": "Sesión CristoFit Camp - 100%"
      },
      {
        "date": "2026-08-22",
        "attended": true,
        "notes": "Entrenamiento de fuerza y calistenia"
      },
      {
        "date": "2026-08-24",
        "attended": true,
        "notes": "Movilidad articular y Buteyko"
      }
    ],
    "assessments": [
      {
        "date": "2026-08-01",
        "weightKg": 64.8,
        "heightM": 1.8,
        "imc": 20,
        "notes": "Evaluación inicial de ciclo"
      },
      {
        "date": "2026-08-22",
        "weightKg": 63,
        "heightM": 1.8,
        "imc": 19.4,
        "notes": "Progreso notable en resistencia y fuerza"
      }
    ],
    "escuadronId": "Gedeón-2",
    "phase": "2 - Desarrollo",
    "isVipProfile": false,
    "hubConsumption": {
      "snackBar": false,
      "merchandise": false,
      "preventiveMedicine": false
    },
    "avatarUrl": ""
  },
  {
    "id": "std-66",
    "name": "Romina Salvatierra",
    "phone": "+59176525454",
    "email": "romina.salvatierra@templefit.com",
    "instructorAssigned": "Paulo Alberto Gil Cuellar (Head Coach)",
    "status": "inactive",
    "plan": "Formación E.A.G.E.",
    "startDate": "2026-08-01",
    "renewalDate": "2026-09-15",
    "birthDate": "1994-07-10",
    "paidServiceTitle": "Formación E.A.G.E. Liderazgo y Combate (300 Bs.)",
    "serviceFeeBs": 300,
    "billingCycle": "mensual",
    "paymentStatus": "pendiente",
    "amountPaidBs": 0,
    "pendingBalanceBs": 300,
    "lastPaymentDate": "",
    "nextDueDate": "2026-09-01",
    "additionalServices": [
      "Snack Bar Prepago",
      "ElectroHidra"
    ],
    "snackBarBalanceBs": 50,
    "physicalGoal": "Fuerza funcional, calistenia y pérdida de 4kg de grasa",
    "weightKg": 69,
    "heightM": 1.83,
    "workoutLevel": "Intermedio",
    "currentRoutineExercises": "1. Calistenia funcional básica y movilidad\n2. Sentadillas con peso corporal (4x15)\n3. Flexiones en barra inclinada (4x10)\n4. Planchas isométricas (4x45s)\n5. Caminata activa y respiración nasal",
    "nutritionPlan": "Catering Saludable Abuela Fit + Hidratación Activa",
    "currentDiet": "Dieta hipercalórica desordenada, bajo consumo de agua.",
    "prescribedDiet": "Catering Abuela Fit + 3L de agua alcalina con electrolitos naturales. Suplemento con glutamina.",
    "allergiesOrRestrictions": "Ninguna",
    "eatingDisordersOrIssues": "Sin trastornos diagnosticados.",
    "neuroticAndStressFactors": "Tensión cervical por jornadas frente a pantalla y cortisol elevado",
    "spiritualIntention": "Consolidar la disciplina del despertar a las 05:30 AM con oración y enfoque.",
    "mentorshipNotes": "Atleta integrado al escuadrón Gedeón-3. Compromiso regular en sesiones CristoFit Camp.",
    "attendanceHistory": [
      {
        "date": "2026-08-20",
        "attended": true,
        "notes": "Sesión CristoFit Camp - 100%"
      },
      {
        "date": "2026-08-22",
        "attended": true,
        "notes": "Entrenamiento de fuerza y calistenia"
      },
      {
        "date": "2026-08-24",
        "attended": true,
        "notes": "Movilidad articular y Buteyko"
      }
    ],
    "assessments": [
      {
        "date": "2026-08-01",
        "weightKg": 70.8,
        "heightM": 1.83,
        "imc": 21.1,
        "notes": "Evaluación inicial de ciclo"
      },
      {
        "date": "2026-08-22",
        "weightKg": 69,
        "heightM": 1.83,
        "imc": 20.6,
        "notes": "Progreso notable en resistencia y fuerza"
      }
    ],
    "escuadronId": "Gedeón-3",
    "phase": "2 - Desarrollo",
    "isVipProfile": false,
    "hubConsumption": {
      "snackBar": true,
      "merchandise": true,
      "preventiveMedicine": false
    },
    "avatarUrl": ""
  },
  {
    "id": "std-67",
    "name": "Felipe Castedo",
    "phone": "+59176609173",
    "email": "felipe.castedo@templefit.com",
    "instructorAssigned": "Paulo Alberto Gil Cuellar (Head Coach)",
    "status": "inactive",
    "plan": "Formación E.A.G.E.",
    "startDate": "2026-08-01",
    "renewalDate": "2026-09-15",
    "birthDate": "1995-08-13",
    "paidServiceTitle": "Formación E.A.G.E. Liderazgo y Combate (300 Bs.)",
    "serviceFeeBs": 300,
    "billingCycle": "mensual",
    "paymentStatus": "pendiente",
    "amountPaidBs": 0,
    "pendingBalanceBs": 300,
    "lastPaymentDate": "",
    "nextDueDate": "2026-09-01",
    "additionalServices": [
      "Chequeo Antropométrico"
    ],
    "snackBarBalanceBs": 0,
    "physicalGoal": "Composición corporal, masa muscular magra y resistencia",
    "weightKg": 76.5,
    "heightM": 1.61,
    "workoutLevel": "Intermedio",
    "currentRoutineExercises": "1. Muscle-ups y fondos lastrados (4x6)\n2. Dominadas con agarre supino (4x10)\n3. Pistols asistidos (4x8 p/lado)\n4. Flexiones pliométricas (4x12)\n5. Sparring técnico y Buteyko",
    "nutritionPlan": "Smoothie de Salomón + Plan Detox 0 Azúcar",
    "currentDiet": "Salteo de comidas, exceso de gaseosas y azúcar refinada.",
    "prescribedDiet": "Detox 21 Días sin azúcar. Smoothie de Salomón matutino, ensaladas verdes y pescado fresco.",
    "allergiesOrRestrictions": "Ninguna",
    "eatingDisordersOrIssues": "Sin trastornos diagnosticados.",
    "neuroticAndStressFactors": "Manejo de estrés cotidiano.",
    "spiritualIntention": "Superar la pereza mental y liderar con el ejemplo en su hogar y trabajo.",
    "mentorshipNotes": "Atleta integrado al escuadrón Gedeón-4. Compromiso regular en sesiones CristoFit Camp.",
    "attendanceHistory": [
      {
        "date": "2026-08-20",
        "attended": true,
        "notes": "Sesión CristoFit Camp - 100%"
      },
      {
        "date": "2026-08-22",
        "attended": true,
        "notes": "Entrenamiento de fuerza y calistenia"
      },
      {
        "date": "2026-08-24",
        "attended": true,
        "notes": "Movilidad articular y Buteyko"
      }
    ],
    "assessments": [
      {
        "date": "2026-08-01",
        "weightKg": 78.3,
        "heightM": 1.61,
        "imc": 30.2,
        "notes": "Evaluación inicial de ciclo"
      },
      {
        "date": "2026-08-22",
        "weightKg": 76.5,
        "heightM": 1.61,
        "imc": 29.5,
        "notes": "Progreso notable en resistencia y fuerza"
      }
    ],
    "escuadronId": "Gedeón-4",
    "phase": "2 - Desarrollo",
    "isVipProfile": false,
    "hubConsumption": {
      "snackBar": false,
      "merchandise": false,
      "preventiveMedicine": false
    },
    "avatarUrl": ""
  }
],
  transactions: [
  {
    "id": "tx-1",
    "date": "2026-08-01",
    "type": "income",
    "category": "membership",
    "amount": 450,
    "description": "Coaching 1 a 1 - Antonio Eid (VIP)"
  },
  {
    "id": "tx-2",
    "date": "2026-08-01",
    "type": "income",
    "category": "membership",
    "amount": 200,
    "description": "Membresía Reto 21 Días - Carlos Gutiérrez"
  },
  {
    "id": "tx-3",
    "date": "2026-08-01",
    "type": "income",
    "category": "membership",
    "amount": 200,
    "description": "Membresía Reto 21 Días - Mariana Flores"
  },
  {
    "id": "tx-4",
    "date": "2026-08-01",
    "type": "income",
    "category": "membership",
    "amount": 200,
    "description": "Membresía Reto 21 Días - José Luis Mamani"
  },
  {
    "id": "tx-5",
    "date": "2026-08-02",
    "type": "income",
    "category": "membership",
    "amount": 200,
    "description": "Membresía Reto 21 Días - Daniela Quispe"
  },
  {
    "id": "tx-6",
    "date": "2026-08-02",
    "type": "income",
    "category": "membership",
    "amount": 200,
    "description": "Membresía Mensual - Andrés Paredes"
  },
  {
    "id": "tx-7",
    "date": "2026-08-02",
    "type": "income",
    "category": "membership",
    "amount": 200,
    "description": "Membresía Mensual - Valeria Mercado"
  },
  {
    "id": "tx-8",
    "date": "2026-08-03",
    "type": "income",
    "category": "membership",
    "amount": 500,
    "description": "Membresía Trimestral Atleta - Rodrigo Mendoza"
  },
  {
    "id": "tx-9",
    "date": "2026-08-03",
    "type": "income",
    "category": "membership",
    "amount": 500,
    "description": "Membresía Trimestral Atleta - Camila Zeballos"
  },
  {
    "id": "tx-10",
    "date": "2026-08-03",
    "type": "income",
    "category": "membership",
    "amount": 500,
    "description": "Membresía Trimestral Atleta - Fernando Torrico"
  },
  {
    "id": "tx-11",
    "date": "2026-08-04",
    "type": "income",
    "category": "membership",
    "amount": 200,
    "description": "Membresía Mensual - Gabriela Rojas"
  },
  {
    "id": "tx-12",
    "date": "2026-08-04",
    "type": "income",
    "category": "membership",
    "amount": 200,
    "description": "Membresía Reto 21 Días - Diego Villarroel"
  },
  {
    "id": "tx-13",
    "date": "2026-08-05",
    "type": "income",
    "category": "membership",
    "amount": 200,
    "description": "Membresía Mensual - Luciana Peñaranda"
  },
  {
    "id": "tx-14",
    "date": "2026-08-05",
    "type": "income",
    "category": "membership",
    "amount": 450,
    "description": "Coaching 1 a 1 - Mauricio Calvimontes"
  },
  {
    "id": "tx-15",
    "date": "2026-08-06",
    "type": "income",
    "category": "membership",
    "amount": 500,
    "description": "Membresía Trimestral Atleta - Sofia Banzer"
  },
  {
    "id": "tx-16",
    "date": "2026-08-07",
    "type": "income",
    "category": "membership",
    "amount": 300,
    "description": "Formación E.A.G.E. - Javier Justiniano"
  },
  {
    "id": "tx-17",
    "date": "2026-08-08",
    "type": "income",
    "category": "membership",
    "amount": 150,
    "description": "CristoFit Camp Intensivo - Natalia Aguilera"
  },
  {
    "id": "tx-18",
    "date": "2026-08-10",
    "type": "income",
    "category": "membership",
    "amount": 500,
    "description": "Membresía Trimestral Atleta - Mateo Saucedo"
  },
  {
    "id": "tx-19",
    "date": "2026-08-12",
    "type": "income",
    "category": "membership",
    "amount": 200,
    "description": "Membresía Mensual - Isabella Hurtado"
  },
  {
    "id": "tx-20",
    "date": "2026-08-14",
    "type": "income",
    "category": "membership",
    "amount": 450,
    "description": "Coaching 1 a 1 - Sebastián Pinto"
  },
  {
    "id": "tx-21",
    "date": "2026-08-02",
    "type": "income",
    "category": "snack",
    "amount": 420,
    "description": "Venta Bebidas ElectroHidra y Pudines H-Control (Sábado Camp)"
  },
  {
    "id": "tx-22",
    "date": "2026-08-05",
    "type": "income",
    "category": "snack",
    "amount": 580,
    "description": "Recarga saldo prepago Snack Bar (10 atletas)"
  },
  {
    "id": "tx-23",
    "date": "2026-08-09",
    "type": "income",
    "category": "snack",
    "amount": 650,
    "description": "Venta Bowls de Elías y Smoothies de Salomón"
  },
  {
    "id": "tx-24",
    "date": "2026-08-15",
    "type": "income",
    "category": "snack",
    "amount": 720,
    "description": "Consumo cafetería saludable CristoFit Camp"
  },
  {
    "id": "tx-25",
    "date": "2026-08-18",
    "type": "income",
    "category": "snack",
    "amount": 480,
    "description": "Venta hidratación isotónica y té de profetas"
  },
  {
    "id": "tx-26",
    "date": "2026-08-04",
    "type": "income",
    "category": "merchandise",
    "amount": 680,
    "description": "Venta Indumentaria Oficial (4 Poleras TempleFit)"
  },
  {
    "id": "tx-27",
    "date": "2026-08-11",
    "type": "income",
    "category": "merchandise",
    "amount": 520,
    "description": "Venta Canguro Táctico y muñequeras"
  },
  {
    "id": "tx-28",
    "date": "2026-08-06",
    "type": "income",
    "category": "medicine",
    "amount": 800,
    "description": "Pack Suplementos Glutamina + Omega-3 (4 atletas)"
  },
  {
    "id": "tx-29",
    "date": "2026-08-13",
    "type": "income",
    "category": "medicine",
    "amount": 700,
    "description": "Evaluaciones Antropométricas con Bioimpedancia"
  },
  {
    "id": "tx-30",
    "date": "2026-08-07",
    "type": "income",
    "category": "courses",
    "amount": 1500,
    "description": "Taller Neuro-Entrenamiento y Respiración Buteyko"
  },
  {
    "id": "tx-31",
    "date": "2026-08-01",
    "type": "expense",
    "category": "rent",
    "amount": 3500,
    "description": "Alquiler Centro de Entrenamiento / Sede Central"
  },
  {
    "id": "tx-32",
    "date": "2026-08-05",
    "type": "expense",
    "category": "operations",
    "amount": 5000,
    "description": "Honorarios Cuerpo Técnico (Head Coach + 2 Instructores Asistentes)"
  },
  {
    "id": "tx-33",
    "date": "2026-08-06",
    "type": "expense",
    "category": "operations",
    "amount": 1400,
    "description": "Insumos Snack Bar (sal marina, miel, chía, avena, cúrcuma)"
  },
  {
    "id": "tx-34",
    "date": "2026-08-08",
    "type": "expense",
    "category": "operations",
    "amount": 750,
    "description": "Servicios Básicos (Luz trifásica, Agua potable, Internet Fibra)"
  },
  {
    "id": "tx-35",
    "date": "2026-08-10",
    "type": "expense",
    "category": "ads",
    "amount": 600,
    "description": "Pauta publicitaria Meta Ads (Convocatoria Reto 21 Días)"
  },
  {
    "id": "tx-36",
    "date": "2026-08-12",
    "type": "expense",
    "category": "operations",
    "amount": 450,
    "description": "Mantenimiento jaula de calistenia y colchonetas de seguridad"
  }
],
  dailyLogs: [],
  users: [
    {
      id: 'usr-admin',
      name: 'Paulo Alberto Gil Cuellar (Head Coach)',
      email: 'admin@templefit.com',
      password: 'admin',
      role: 'admin',
      avatar: 'PG'
    },
    {
      id: 'usr-instructor',
      name: 'Capitán de Escuadrón',
      email: 'instructor@templefit.com',
      password: 'coach',
      role: 'instructor',
      avatar: 'CE'
    }
  ],
  ingredients: [
    { id: 'ing-1', name: 'Sal Marina Natural Pura', unit: 'gr', costPerUnit: 0.04, stock: 2500, minStock: 500 },
    { id: 'ing-2', name: 'Miel Pura de Abeja', unit: 'gr', costPerUnit: 0.06, stock: 5000, minStock: 1000 },
    { id: 'ing-3', name: 'Cúrcuma en Polvo (Cupesí)', unit: 'gr', costPerUnit: 0.14, stock: 1500, minStock: 300 },
    { id: 'ing-4', name: 'Jengibre Fresco Rallado', unit: 'gr', costPerUnit: 0.03, stock: 3000, minStock: 500 },
    { id: 'ing-5', name: 'Canela en Rama', unit: 'gr', costPerUnit: 0.08, stock: 1000, minStock: 200 },
    { id: 'ing-6', name: 'Avena Integral en Hojuelas', unit: 'gr', costPerUnit: 0.02, stock: 10000, minStock: 2000 },
    { id: 'ing-7', name: 'Semillas de Chía', unit: 'gr', costPerUnit: 0.05, stock: 4000, minStock: 1000 },
    { id: 'ing-8', name: 'Shake H-Control (Porción)', unit: 'unidad', costPerUnit: 7.5, stock: 45, minStock: 15 },
    { id: 'ing-9', name: 'Leche de Almendras sin azúcar', unit: 'ml', costPerUnit: 0.02, stock: 6000, minStock: 1500 }
  ],
  recipes: [
    { 
      id: 'rec-1', 
      name: 'ElectroHidra "Elite-Hydration" (Isotónica)',
      category: 'bebidas',
      time: 5,
      difficulty: 'Fácil',
      servings: 1,
      description: 'Bebida isotónica 280-300 mOsm/kg con buffer contra el lactato muscular.',
      ingredientsText: [
        '1L agua filtrada',
        '1.2g sal marina natural',
        '0.6g bicarbonato de sodio',
        '0.6g cloruro de potasio',
        '100mg citrato de magnesio',
        '60g miel pura de abeja',
        '30ml jugo de limón fresco'
      ],
      steps: [
        'Disolver los minerales en el agua.',
        'Añadir la miel pura y mezclar.',
        'Incorporar el jugo de limón y servir fresco.'
      ],
      macros: { calories: 190, protein: 0, fat: 0, carbs: 48 },
      image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=800&auto=format&fit=crop',
      crmIngredients: [
        { ingredientId: 'ing-1', quantity: 1.2 },
        { ingredientId: 'ing-2', quantity: 60 }
      ], 
      suggestedPrice: 15 
    },
    { 
      id: 'rec-2', 
      name: 'Smoothie Cerebral de Salomón',
      category: 'bebidas',
      time: 5,
      difficulty: 'Fácil',
      servings: 1,
      description: 'Potenciador cognitivo con cúrcuma activada por piperina (+2000% absorción).',
      ingredientsText: [
        '60g aguacate maduro',
        '50g espinaca fresca',
        '60g arándanos',
        '150ml leche de almendras',
        '15g semillas de chía',
        '2g cúrcuma Cupesí + pizca de pimienta negra'
      ],
      steps: [
        'Colocar todos los ingredientes en licuadora.',
        'Licuar por 60 segundos hasta consistencia cremosa.'
      ],
      macros: { calories: 260, protein: 6, fat: 18, carbs: 19 },
      image: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?q=80&w=800&auto=format&fit=crop',
      crmIngredients: [
        { ingredientId: 'ing-3', quantity: 2 },
        { ingredientId: 'ing-7', quantity: 15 },
        { ingredientId: 'ing-9', quantity: 150 }
      ], 
      suggestedPrice: 20 
    },
    { 
      id: 'rec-3', 
      name: 'Pudín de Shake H-Control (Snack Bar)',
      category: 'snack',
      time: 10,
      difficulty: 'Fácil',
      servings: 1,
      description: 'Pudín proteico bajo en calorías sin azúcares refinados formulado para el Reto 21 Días.',
      ingredientsText: [
        '30g Shake H-Control',
        '150ml agua o leche vegetal',
        '10g chía',
        'Canela al gusto'
      ],
      steps: [
        'Batir el Shake H-Control con el líquido y la chía.',
        'Refrigerar 20 minutos hasta gelificar.',
        'Espolvorear canela y servir frío.'
      ],
      macros: { calories: 180, protein: 22, fat: 4, carbs: 12 },
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800&auto=format&fit=crop',
      crmIngredients: [
        { ingredientId: 'ing-8', quantity: 1 },
        { ingredientId: 'ing-7', quantity: 10 }
      ], 
      suggestedPrice: 25 
    }
  ],
  mentorshipSessions: [],
  leads: [
    { id: 'ld-1', name: 'Samuel Ortiz', phone: '+59178901234', source: 'instagram', status: 'appointment_set', notes: 'Agendado para clase de prueba sábado 06:00 AM en CristoFit Camp', dateAdded: '2026-08-10' },
    { id: 'ld-2', name: 'Valeria Justiniano', phone: '+59165432198', source: 'whatsapp', status: 'trial', notes: 'En semana de prueba gratuita (Escuadrón Paz). Muy interesada en nutrición.', dateAdded: '2026-08-12' },
    { id: 'ld-3', name: 'Carlos Medina', phone: '+59170098765', source: 'walk-in', status: 'contacted', notes: 'Consultó por Neuro-Entrenamiento en Ventas y horario nocturno', dateAdded: '2026-08-14' },
    { id: 'ld-4', name: 'Laura Torrez', phone: '+59171122334', source: 'referral', status: 'new', notes: 'Recomendada por Carlos Gutiérrez. Quiere unirse al Reto 21 Días.', dateAdded: '2026-08-16' }
  ],
  weeklyChecklist: {
    Lunes: [
      { id: 'lun-1', task: 'Revisión Cuadro de Mando Ejecutivo / Semáforo (08:00 AM)', done: false },
      { id: 'lun-2', task: 'Análisis de Regla del Semáforo (Ingresos, Vidas, Margen)', done: false },
      { id: 'lun-3', task: 'Lanzamiento de Embudo F1 (Nuevos Leads)', done: false },
    ],
    Martes: [
      { id: 'mar-1', task: 'Seguimiento de Asistencia a Escuadrones (Regla de los 12)', done: false },
      { id: 'mar-2', task: 'Activación de Embudo F2 Recovery (24h inactivos)', done: false },
      { id: 'mar-3', task: 'Inventario Snack Bar y Suplementos Botánicos', done: false },
    ],
    Miercoles: [
      { id: 'mie-1', task: 'Planificación Logística Sábado CristoFit Camp (06:00 AM)', done: false },
      { id: 'mie-2', task: 'Coordinación brigadas Palabra y Pan / Ciudad sin Basura', done: false },
      { id: 'mie-3', task: 'Revisión de Casos de Medicina Preventiva y Buteyko', done: false },
    ],
    Jueves: [
      { id: 'jue-1', task: 'Confirmación Asistencia al CristoFit Camp', done: false },
      { id: 'jue-2', task: 'Cierre de pedidos Snack Bar con 50% de seña (Regla No Stock)', done: false },
      { id: 'jue-3', task: 'Revisión de Barras de Calistenia y Equipamiento', done: false },
    ],
    Viernes: [
      { id: 'vie-1', task: 'Producción de Alimentos y Panadería Abuela Fit', done: false },
      { id: 'vie-2', task: 'Show Fit y Taller de Capacitación en Salud Preventiva (18:00)', done: false },
      { id: 'vie-3', task: 'Corte y Conciliación Financiera Semanal', done: false },
    ],
    Sabado: [
      { id: 'sab-1', task: 'Ejecución CristoFit Camp (06:00 AM a 09:30 AM)', done: false },
      { id: 'sab-2', task: 'Evaluación del Reto 21 Días y Servicio Comunitario (11:00 AM)', done: false },
      { id: 'sab-3', task: 'Degustación Snack Bar, Testimonios y Cierre de Nuevos Atletas', done: false },
    ]
  },
  marketingTasks: [
    { id: 'mkt-1', month: 'Agosto 2026', campaignName: 'Lanzamiento Reto 21 Días = ÍNTEGROS', driveLink: 'https://drive.google.com/...', strategy: 'Testimonios reales de atletas, rutina 06:00 AM y cobertura de CristoFit Camp' }
  ],
  claimsTickets: [
    { id: 'tck-1', date: '2026-08-04', clientName: 'Valeria Condori', issue: 'Consulta sobre compatibilidad de colágeno hidrolizado con ayuno', status: 'pending', resolution: '' }
  ],
  contentPosts: [
    {
      id: 'post-1',
      monthIndex: 1,
      dayOfWeek: 'Lunes',
      pillar: 'Storytelling & Testimonios',
      title: 'Historia de Transformación: De la Ansiedad a la Disciplina de Acero',
      hookAndStory: 'No es solo sudar en un gimnasio; es recuperar la paz mental a las 06:00 AM. Cuando ordenas tu templo, ordenas tu vida entera.',
      callToAction: 'Comenta "RETO21" y te enviamos el plan de inicio para este sábado.',
      driveDocLink: 'https://docs.google.com/document/d/templefit-storytelling-guion-1',
      status: 'scheduled',
      targetAudience: 'Nuevos Prospectos & Comunidad'
    },
    {
      id: 'post-2',
      monthIndex: 1,
      dayOfWeek: 'Miércoles',
      pillar: 'Hábitos 3 Áreas',
      title: 'El Trípode Inquebrantable: Espíritu, Mente y Cuerpo',
      hookAndStory: 'Si entrenas el cuerpo pero descuidas tus pensamientos y tu nutrición, vives en conflicto constante. Conoce el método de 3 pilares.',
      callToAction: 'Guarda esta guía práctica y aplícala mañana a primera hora.',
      driveDocLink: 'https://docs.google.com/document/d/templefit-habitos-tripode',
      status: 'scheduled',
      targetAudience: 'Atletas Activos'
    },
    {
      id: 'post-3',
      monthIndex: 1,
      dayOfWeek: 'Viernes',
      pillar: 'Consumo Consciente & Snack',
      title: 'Por qué eliminamos el azúcar refinado en el Snack Bar',
      hookAndStory: 'El combustible de un atleta debe desinflamar, no aletargar. Te mostramos cómo preparamos la ElectroHidra con minerales puros.',
      callToAction: 'Pide tu ElectroHidra este sábado en el CristoFit Camp.',
      driveDocLink: 'https://docs.google.com/document/d/templefit-recetario-snack',
      status: 'scheduled',
      targetAudience: 'Comunidad General'
    },
    {
      id: 'post-4',
      monthIndex: 1,
      dayOfWeek: 'Sábado',
      pillar: 'CristoFit Camp',
      title: 'Cobertura en Vivo: CristoFit Camp al Aire Libre',
      hookAndStory: 'Entrenamiento funcional, calistenia, hermandad y servicio comunitario "Palabra y Pan". Santa Cruz se levanta con propósito.',
      callToAction: 'Etiqueta a tu compañero de escuadrón que no faltó hoy.',
      driveDocLink: 'https://drive.google.com/drive/folders/templefit-camp-fotos',
      status: 'scheduled',
      targetAudience: 'Comunidad & Escuadrones'
    },
    {
      id: 'post-5',
      monthIndex: 1,
      dayOfWeek: 'Martes',
      pillar: 'Lives & Retos',
      title: 'Sesión Táctica VIP: Optimización de Hábitos para Alta Dirección',
      hookAndStory: 'Cómo los líderes y empresarios integran calistenia, ayuno consciente y respiración para rendir al 100% sin burnout.',
      callToAction: 'Exclusivo para miembros del programa de coaching 1 a 1.',
      driveDocLink: 'https://docs.google.com/document/d/templefit-vip-antonio-eid',
      status: 'draft',
      targetAudience: 'Antonio Eid / Atletas VIP'
    }
  ],
  inventory: [
    {
      id: 'inv-polera-1',
      name: 'Polera Oficial de Algodón TempleFit',
      category: 'apparel',
      cost: 50,
      price: 100,
      stock: 45,
      minStock: 10,
      size: 'M',
      color: 'Negro con Dorado',
      imageUrl: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: 'inv-shorts-1',
      name: 'Shorts Deportivos Tácticos',
      category: 'apparel',
      cost: 35,
      price: 70,
      stock: 30,
      minStock: 8,
      size: 'L',
      color: 'Azul Marino Táctico',
      imageUrl: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: 'inv-hoodie-1',
      name: 'Canguro / Hoodie Oficial TempleFit',
      category: 'apparel',
      cost: 80,
      price: 150,
      stock: 20,
      minStock: 5,
      size: 'XL',
      color: 'Negro Premium',
      imageUrl: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: 'inv-ginkgo-1',
      name: 'Ginkgo Biloba Neuro-Circulatorio (120 caps)',
      category: 'suplementos',
      cost: 85,
      price: 150,
      stock: 25,
      minStock: 6,
      imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: 'inv-coco-1',
      name: 'Óleo de Coco Extra Virgen (200 ml)',
      category: 'suplementos',
      cost: 40,
      price: 75,
      stock: 40,
      minStock: 10,
      imageUrl: 'https://images.unsplash.com/photo-1526947425960-945c6e72858f?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: 'inv-colageno-1',
      name: 'Colágeno Hidrolizado Articular (100 ml)',
      category: 'suplementos',
      cost: 50,
      price: 95,
      stock: 35,
      minStock: 8,
      imageUrl: 'https://images.unsplash.com/photo-1550572017-edd951aa8f72?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: 'inv-glutamina-1',
      name: 'Glutamina Pura Anticatabólica (300 gr)',
      category: 'suplementos',
      cost: 80,
      price: 150,
      stock: 20,
      minStock: 5,
      imageUrl: 'https://images.unsplash.com/photo-1579722820308-d74e571900a9?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: 'inv-omega-1',
      name: 'Tabletas de Pescado Omega-3 (20 tabletas)',
      category: 'suplementos',
      cost: 5,
      price: 10,
      stock: 100,
      minStock: 25,
      imageUrl: 'https://images.unsplash.com/photo-1577401239170-897942555fb3?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: 'inv-levadura-1',
      name: 'Levadura de Cerveza en Polvo (500 gr)',
      category: 'suplementos',
      cost: 45,
      price: 85,
      stock: 30,
      minStock: 6,
      imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: 'inv-curcuma-1',
      name: 'Cúrcuma (Cupesí) en polvo (250 gr)',
      category: 'suplementos',
      cost: 18,
      price: 35,
      stock: 50,
      minStock: 12,
      imageUrl: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: 'inv-reumasan-1',
      name: 'Reumasan Crema Articular Tópica',
      category: 'suplementos',
      cost: 8,
      price: 15,
      stock: 60,
      minStock: 15,
      imageUrl: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: 'inv-sal-1',
      name: 'Sal Marina Natural (50 gr)',
      category: 'suplementos',
      cost: 8,
      price: 20,
      stock: 80,
      minStock: 20,
      imageUrl: 'https://images.unsplash.com/photo-1518110925495-5fe2fda0442c?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: 'inv-b12-1',
      name: 'Complejo Vitamínico B12',
      category: 'suplementos',
      cost: 40,
      price: 80,
      stock: 25,
      minStock: 6,
      imageUrl: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: 'inv-electrohidra-1',
      name: 'ElectroHidra "Elite-Hydration" (1L)',
      category: 'snack',
      cost: 6,
      price: 15,
      stock: 50,
      minStock: 15,
      imageUrl: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: 'inv-electrodetox-1',
      name: 'ElectroDetox Blast (1L)',
      category: 'snack',
      cost: 6,
      price: 15,
      stock: 40,
      minStock: 10,
      imageUrl: 'https://images.unsplash.com/photo-1556881286-fc6915169721?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: 'inv-bowl-1',
      name: 'Bowl del Guerrero de Elías',
      category: 'snack',
      cost: 10,
      price: 25,
      stock: 35,
      minStock: 10,
      imageUrl: 'https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: 'inv-smoothie-1',
      name: 'Smoothie Cerebral de Salomón',
      category: 'snack',
      cost: 9,
      price: 20,
      stock: 30,
      minStock: 8,
      imageUrl: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?q=80&w=800&auto=format&fit=crop'
    }
  ],
  showcaseItems: [
    {
      id: 'show-polera-1',
      type: 'merch',
      title: 'Polera Oficial de Algodón TempleFit',
      description: 'Algodón de alta densidad 240gsm, corte vintage elegante y distintivo de escuadrón oficial.',
      price: 100,
      imageUrl: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=800&auto=format&fit=crop',
      status: 'active'
    },
    {
      id: 'show-shorts-1',
      type: 'merch',
      title: 'Shorts Deportivos Tácticos',
      description: 'Microfibra de alto rendimiento transpirable para calistenia y sparring de boxeo ético.',
      price: 70,
      imageUrl: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?q=80&w=800&auto=format&fit=crop',
      status: 'active'
    },
    {
      id: 'show-hoodie-1',
      type: 'merch',
      title: 'Canguro / Hoodie Oficial TempleFit',
      description: 'Tejido térmico resistente con bolsillo táctico para el amanecer 06:00 AM en el CristoFit Camp.',
      price: 150,
      imageUrl: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=800&auto=format&fit=crop',
      status: 'active'
    },
    {
      id: 'show-ginkgo-1',
      type: 'merch',
      title: 'Ginkgo Biloba Neuro-Circulatorio (120 caps)',
      description: 'Estimulación del flujo sanguíneo cerebral, concentración y biohacking cognitivo.',
      price: 150,
      imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=800&auto=format&fit=crop',
      status: 'active'
    },
    {
      id: 'show-coco-1',
      type: 'merch',
      title: 'Óleo de Coco Extra Virgen (200 ml)',
      description: 'Triglicéridos de cadena media (TCM) para energía limpia y metabolismo celular.',
      price: 75,
      imageUrl: 'https://images.unsplash.com/photo-1526947425960-945c6e72858f?q=80&w=800&auto=format&fit=crop',
      status: 'active'
    },
    {
      id: 'show-colageno-1',
      type: 'merch',
      title: 'Colágeno Hidrolizado (100 ml)',
      description: 'Regeneración articular, cartílagos y soporte ligamentario para entrenamientos de impacto.',
      price: 95,
      imageUrl: 'https://images.unsplash.com/photo-1550572017-edd951aa8f72?q=80&w=800&auto=format&fit=crop',
      status: 'active'
    },
    {
      id: 'show-glutamina-1',
      type: 'merch',
      title: 'Glutamina Pura Anticatabólica (300 gr)',
      description: 'Recuperación intestinal y síntesis muscular acelerada post CristoFit Camp.',
      price: 150,
      imageUrl: 'https://images.unsplash.com/photo-1579722820308-d74e571900a9?q=80&w=800&auto=format&fit=crop',
      status: 'active'
    },
    {
      id: 'show-electrohidra-1',
      type: 'recipe',
      title: 'ElectroHidra "Elite-Hydration"',
      description: 'Fórmula isotónica con sal marina, bicarbonato, magnesio, miel pura y limón.',
      price: 15,
      imageUrl: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=800&auto=format&fit=crop',
      status: 'active'
    },
    {
      id: 'show-electrodetox-1',
      type: 'recipe',
      title: 'ElectroDetox Blast (Autofagia)',
      description: 'Infusión botánica de clavo de olor, canela, pepino, apio y jengibre desintoxicante.',
      price: 15,
      imageUrl: 'https://images.unsplash.com/photo-1556881286-fc6915169721?q=80&w=800&auto=format&fit=crop',
      status: 'active'
    }
  ],
  sopsList: [
    {
      id: 'sop-auditoria-cierre',
      title: 'SOP: Auditoría de KPIs y Cierre de Ciclo',
      step1: 'Auditoría de progreso de atletas y sumatoria de logros por escuadrón.',
      step2: 'Reporte de rentabilidad mensual en Bs. y análisis de conversión post-evento.',
      step3: 'Checklist de protocolo de premiación (Coronas de Bronce, Plata y Oro) y contratos/remanentes.'
    },
    {
      id: 'sop-planificacion-expansion',
      title: 'SOP: Planificación Anual, Alianzas y Expansión',
      step1: 'Coordinación con líderes locales y alianzas regionales / empresas aliadas.',
      step2: 'Planificación estratégica regional y proyección de crecimiento de los 25 escuadrones.',
      step3: 'Reunión de alineación semanal y revisión de cumplimiento de objetivos 50/50.'
    },
    {
      id: 'sop-habitos-calidad',
      title: 'SOP: Hábitos de Calidad y Rendición Semanal',
      step1: 'Registro diario de prospectos y validación de asistencia técnica 06:00 AM.',
      step2: 'Mentoría grupal de 30 min y auditoría del movimiento con capitanes.',
      step3: 'Seguimiento de hidratación ElectroHidra y adherencia nutricional del alumno.'
    },
    {
      id: 'sop-plan-accion-estandar',
      title: 'SOP: Plan de Acción Estándar & Embudo de Ventas',
      step1: 'Firma de roles, responsabilidades y setup tecnológico (WhatsApp, Sheets, CRM).',
      step2: 'Capacitación teórica y práctica inicial + Campaña de expectativa masiva.',
      step3: 'Refuerzo de ventas del Reto 21 Días, permanencia y cierre de contratos.'
    }
  ],
  monthlyBoard: {
    month: 'Agosto 2026',
    verse: 'El espíritu da el diseño. El cuerpo es el templo. La mente crea y edifica vidas. (1 Corintios 6:19-20)',
    goals: [
      { area: 'Gimnasio & Reto 21 Días', targetBs: 45000 },
      { area: 'Snack Bar & Bebidas', targetBs: 15000 },
      { area: 'Formación E.A.G.E. & Cursos', targetBs: 25000 },
      { area: 'Armería & Suplementos', targetBs: 18000 }
    ],
    retentionTarget: 85,
    averageTicket: 200,
    newMembersTarget: 10,
    notes: 'Enfoque en consolidación de 25 Escuadrones y expansión de CristoFit Camp los sábados.'
  }
};

export function getCRMDatabase(): CRMDatabase {
  if (typeof window === 'undefined') return DEFAULT_DB;
  
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_DB));
      } catch (e) {}
      return DEFAULT_DB;
    }
    const parsed = JSON.parse(saved) as CRMDatabase;
    
    // Auto-migration: ensure students has at least 65 athletes and coherent financials
    let hasUpdated = false;
    if (!parsed.students || parsed.students.length < 65) {
      parsed.students = DEFAULT_DB.students;
      hasUpdated = true;
    }
    if (!parsed.transactions || parsed.transactions.length < 20) {
      parsed.transactions = DEFAULT_DB.transactions;
      hasUpdated = true;
    };
    if (!parsed.inventory || parsed.inventory.length === 0) {
      parsed.inventory = DEFAULT_DB.inventory;
      hasUpdated = true;
    }
    if (!parsed.showcaseItems || parsed.showcaseItems.length === 0) {
      parsed.showcaseItems = DEFAULT_DB.showcaseItems;
      hasUpdated = true;
    }
    if (!parsed.sopsList || parsed.sopsList.length === 0) {
      parsed.sopsList = DEFAULT_DB.sopsList;
      hasUpdated = true;
    }
    if (!parsed.monthlyBoard) {
      parsed.monthlyBoard = DEFAULT_DB.monthlyBoard;
      hasUpdated = true;
    }
    if (hasUpdated) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
      } catch (e) {}
    }
    return parsed;
  } catch (err) {
    console.error("Error al parsear CRMDatabase de localStorage:", err);
    return DEFAULT_DB;
  }
}

export function saveCRMDatabase(db: CRMDatabase) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
  } catch (e) {
    console.warn("No se pudo persistir en localStorage:", e);
  }

  // Sync back to cloud in background
  if (firestoreDb) {
    try {
      const docRef = doc(firestoreDb, 'workspaces', 'templefit-main');
      setDoc(docRef, db, { merge: true }).catch(err => {
        console.warn("Error sincronizando a Firebase:", err);
      });
    } catch (e) {
      console.warn("Firebase no disponible:", e);
    }
  }
}

export async function syncFromCloud(): Promise<CRMDatabase> {
  if (typeof window === 'undefined') return DEFAULT_DB;

  if (!firestoreDb) return getCRMDatabase();

  try {
    const docRef = doc(firestoreDb, 'workspaces', 'templefit-main');
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      const data = snap.data() as CRMDatabase;
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      } catch (e) {}
      return data;
    }
  } catch (err) {
    console.warn("No se pudo obtener datos de la nube, usando local:", err);
  }

  return getCRMDatabase();
}

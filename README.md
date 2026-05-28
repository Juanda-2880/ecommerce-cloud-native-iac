Project Structure
```
/
├── backend/                          # Backend en Node.js (Express + Sequelize)
│   ├── src/
│   │   ├── config/                   # Configuración de base de datos (Sequelize)
│   │   ├── controllers/              # Controladores (Lógica de rutas)
│   │   ├── middleware/               # Middlewares (Auth, etc.)
│   │   ├── models/                   # Modelos de Sequelize (User, Buyer, Salesperson)
│   │   ├── routes/                   # Definición de rutas
│   │   └── index.js                  # Punto de entrada de la aplicación
│   ├── package.json
│   └── .env                          # Variables de entorno (generado por Terraform)
│
├── frontend/                         # Frontend en React (Vite + Tailwind)
│   ├── src/
│   ├── public/
│   └── package.json
│
├── terraform/                        # Infraestructura como Código (Terraform)
│   ├── modules/                      # Módulos reutilizables
│   │   ├── networking/               # VPC, Subnets, IGW, NAT
│   │   ├── compute/                  # EC2, ASG (Work in progress)
│   │   ├── database/                 # RDS (MySQL)
│   └── environments/
│       └── sandbox/                  # Entorno de desarrollo/pruebas
│
├── scripts/                          # Scripts de automatización
│   └── install_app.sh                # Script de despliegue en EC2
│
└── README.md
```


Infrastructure Diagram

<img width="2240" height="1600" alt="Blank diagram" src="https://github.com/user-attachments/assets/f65c91d9-3f0e-46d2-aef2-cf40732ebe31" />

Project Structure
```
/
├── app/                              # Backend en Node.js 
│   ├── src/
│   │   ├── domain/                   # Capa 1: Entidades (Product, User, Cart)
│   │   ├── application/              # Capa 2: Casos de uso (AddToCart, ProcessPayment )
│   │   ├── interfaces/               # Capa 3: Controladores (Reciben requests, envían responses)
│   │   ├── infrastructure/           # Capa 4: Frameworks y herramientas externas
│   │   │   ├── web/                  # Servidor Express.js y middlewares 
│   │   │   ├── database/             # Modelos de Sequelize y configuración de conexión 
│   │   │   └── aws/                  # Servicios externos (Ej. SDK para S3 si se usa para imágenes )
│   │   └── index.js                  # Punto de entrada de la aplicación
│   ├── package.json
│   └── .env.example                  # Variables de entorno requeridas
│
├── frontend/                         # Frontend estático (HTML, CSS, JS )
│   ├── public/                       # Assets, imágenes, estilos minimalistas 
│   └── index.html
│
├── terraform/                        # Infraestructura como Código (Reemplaza CloudFormation)
│   ├── modules/                      # Módulos reutilizables para mantener el código limpio
│   │   ├── networking/               # VPC, Subnets (Públicas/Privadas), IGW, NAT Gateway 
│   │   ├── compute/                  # ALB, Auto Scaling Group (Max 9), EC2 Bastion 
│   │   ├── database/                 # RDS (t3.micro/medium, Single-AZ) 
│   │   ├── security/                 # Security Groups, IAM Roles (Considerando Read-only )
│   │   └── observability/            # CloudWatch Alarms, SNS, CloudTrail 
│   ├── environments/
│   │   └── sandbox/                  # Variables específicas para el entorno del proyecto
│   │       ├── main.tf               # Invocación de módulos
│   │       ├── variables.tf
│   │       └── terraform.tfvars
│   └── providers.tf                  # Configuración del provider de AWS
│
├── scripts/                          # User Data para EC2 y automatización 
│   └── install_app.sh                # Script para instalar Node, dependencias y arrancar la app en EC2
│
├── docs/                             # Documentación solicitada 
│   └── deployment_guide.md
│
└── README.md

```

Infrastructure Diagram

<img width="2240" height="1600" alt="Blank diagram" src="https://github.com/user-attachments/assets/f65c91d9-3f0e-46d2-aef2-cf40732ebe31" />

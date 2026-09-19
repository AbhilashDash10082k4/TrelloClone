**Architecture -> Frontend -> API call -> Controller -> Service -> Repository -> DB**

1. Health check endpoint
2. `packages/controllers`
   - projectController -
   - const projects = await prisma.find.many()
   - return res.json(projects)

3. `packages/services`-
   - const router = Router();
     router.get("/", projectController)
     index.ts-
   - app.use("/projects", projectRouter)

4. `packages/repository`

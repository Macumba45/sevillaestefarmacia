import { MockContext, Context, createMockContext } from '../../../context'
import { findUserById, findUserEmail } from '../../../pages/api/controllers/user'

let mockCtx: MockContext
let ctx: Context

beforeEach(() => {
    mockCtx = createMockContext()
    ctx = mockCtx as unknown as Context
})

test('should find an email', async () => {
    const email = 'admin@admin.com'

    // Configura el mock para que devuelva un objeto de usuario válido
    mockCtx.prisma.user.findUnique.mockResolvedValue({
        id: '1',
        email: email,
        name: 'admin',
        password: 'hashedPassword',
        role: 'admin',
        phone: '123456789',
        createdAt: new Date(),
        updatedAt: new Date(),
    })

    // Verifica que la respuesta de findUserEmail tenga el campo "email" igual al correo electrónico esperado
    const user = await findUserEmail(email)
    console.log(user)
    expect(user?.email).toEqual(email)
})


test('should find id', async () => {
    const id = 'clnbsspg6000008jz4ejabrx6'
    // Configura el mock para que devuelva un objeto de usuario válido
    mockCtx.prisma.user.findUnique.mockResolvedValue({
        id: id,
        email: 'email',
        name: 'admin',
        password: 'hashedPassword',
        role: 'admin',
        phone: '123456789',
        createdAt: new Date(),
        updatedAt: new Date(),
    })
    const user = await findUserById(id)
    expect(user?.id).toEqual(id)
}

)
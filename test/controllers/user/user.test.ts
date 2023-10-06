import { MockContext, Context, createMockContext } from '../../../context'
import { findUserEmail } from '../../../pages/api/controllers/user'

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
    expect(user?.email).toEqual(email)
})

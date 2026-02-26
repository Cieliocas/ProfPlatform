import os
import resend

RESEND_API_KEY = os.getenv("RESEND_API_KEY")
SENDER_EMAIL = os.getenv("SENDER_EMAIL", "onboarding@resend.dev") # Default Resend sandbox sender

if RESEND_API_KEY:
    resend.api_key = RESEND_API_KEY

def send_email(to_email: str, subject: str, html_content: str):
    """
    Envia um email usando o Resend. Se a chave da API não estiver configurada,
    imprime o email no console (modo de desenvolvimento).
    """
    if not RESEND_API_KEY:
        print("\n" + "="*50)
        print("MODO DE DESENVOLVIMENTO: E-MAIL NÃO ENVIADO VIA REDE.")
        print(f"Para: {to_email}")
        print(f"Assunto: {subject}")
        print("-" * 50)
        print(html_content)
        print("="*50 + "\n")
        return True

    try:
        r = resend.Emails.send({
            "from": f"Bioativa <{SENDER_EMAIL}>",
            "to": to_email,
            "subject": subject,
            "html": html_content
        })
        return True
    except Exception as e:
        print(f"Erro ao enviar email via Resend: {e}")
        return False

def send_verification_email(email: str, name: str, token: str):
    # Link pointing to frontend confirmation page
    frontend_url = os.getenv("FRONTEND_URL", "http://localhost:3000")
    confirm_link = f"{frontend_url}/confirmar-email?token={token}"
    
    html = f"""
    <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
        <h2 style="color: #2e8b57; text-align: center;">Bem-vindo à Bioativa, {name}! 🌿</h2>
        <p>Estamos muito felizes em ter você na nossa comunidade de compartilhamento de vivências pedagógicas.</p>
        <p>Para liberar o acesso à sua conta e começar a postar suas experiências, por favor, clique no botão abaixo para confirmar este endereço de e-mail:</p>
        
        <div style="text-align: center; margin: 30px 0;">
            <a href="{confirm_link}" style="background-color: #2e8b57; color: white; text-decoration: none; padding: 12px 25px; border-radius: 5px; font-weight: bold; display: inline-block;">
                Confirmar Meu E-mail
            </a>
        </div>
        
        <p style="font-size: 14px; color: #666;">Se o botão não funcionar, cole o link abaixo em seu navegador:</p>
        <p style="font-size: 14px; word-break: break-all;"><a href="{confirm_link}" style="color: #2e8b57;">{confirm_link}</a></p>
        
        <hr style="border: 0; border-top: 1px solid #e0e0e0; margin: 30px 0;"/>
        <p style="font-size: 12px; color: #999; text-align: center;">Bioativa &mdash; Projeto de Mestrado. Se você não solicitou este cadastro, pode ignorar esta mensagem.</p>
    </div>
    """
    return send_email(email, "Confirme seu cadastro na Bioativa", html)

def send_password_reset_email(email: str, token: str):
    # Link pointing to frontend reset password page
    frontend_url = os.getenv("FRONTEND_URL", "http://localhost:3000")
    reset_link = f"{frontend_url}/nova-senha?token={token}"
    
    html = f"""
    <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
        <h2 style="color: #2e8b57; text-align: center;">Redefinição de Senha 🔒</h2>
        <p>Recebemos uma solicitação para redefinir a senha da sua conta na Bioativa Associada a este e-mail.</p>
        <p>Se foi você, clique no botão abaixo para cadastrar uma nova senha segura:</p>
        
        <div style="text-align: center; margin: 30px 0;">
            <a href="{reset_link}" style="background-color: #d1b026; color: #333; text-decoration: none; padding: 12px 25px; border-radius: 5px; font-weight: bold; display: inline-block;">
                Redefinir Minha Senha
            </a>
        </div>
        
        <p style="font-size: 14px; color: #666;">Se você não solicitou a redefinição de senha, apenas ignore este e-mail.</p>
        <p style="font-size: 14px; color: #666;">Este link expira em 2 horas por razões de segurança.</p>
        
        <hr style="border: 0; border-top: 1px solid #e0e0e0; margin: 30px 0;"/>
        <p style="font-size: 12px; color: #999; text-align: center;">Bioativa &mdash; Compartilhe Experiências Pedagógicas</p>
    </div>
    """
    return send_email(email, "Instruções de Redefinição de Senha", html)

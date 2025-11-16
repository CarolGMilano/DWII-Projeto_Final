package br.net.dwii.projeto.manutencao.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
  @Autowired
  private JavaMailSender emailService;

  public void enviarEmail(String assunto, String mensagem){
    SimpleMailMessage email = new SimpleMailMessage();

    email.setFrom("manutencaodwii@gmail.com");
    email.setTo("manutencaodwii@gmail.com");
    email.setSubject(assunto);
    email.setText(mensagem);

    emailService.send(email);

    System.out.println("Email enviado com sucesso!");
  }
}

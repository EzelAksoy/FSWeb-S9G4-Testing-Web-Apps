import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import IletisimFormu from "./IletisimFormu";
import App from "../App";

test("hata olmadan render ediliyor", () => {
  render(<App />);
  const greeting = screen.getByText(/Entegrasyon Test Projesi/i);
  expect(greeting).toBeInTheDocument();
});

test("iletişim formu headerı render ediliyor", () => {
  render(<IletisimFormu />);
  const baslık = screen.getByText(/İletişim Formu/i);
  expect(baslık).toBeInTheDocument();
});

test("kullanıcı adını 5 karakterden az girdiğinde BİR hata mesajı render ediyor.", async () => {
  render(<IletisimFormu />);
  const isim = screen.getByTestId("isim_input_test");
  userEvent.type(isim, "Ezel");
  const isimerror = screen.getByTestId("isim_error");
  expect(isimerror).toBeInTheDocument();
});

test("kullanıcı inputları doldurmadığında ÜÇ hata mesajı render ediliyor.", async () => {
  render(<IletisimFormu />);
  const button = screen.getByTestId("kayıt_test");
  userEvent.click(button);
  const isimerror = screen.getByTestId("isim_error");
  expect(isimerror).toBeInTheDocument();
  const soyisimerror = screen.getByTestId("soyisim_error");
  expect(soyisimerror).toBeInTheDocument();
  const mailerror = screen.getByTestId("mailerror");
  expect(mailerror).toBeInTheDocument();
});

test("kullanıcı doğru ad ve soyad girdiğinde ama email girmediğinde BİR hata mesajı render ediliyor.", async () => {
  render(<App />);
  const isim = screen.getByTestId("isim_input_test");
  userEvent.type(isim, "Ramazan");
  const soyisim = screen.getByTestId("soyisim_input_test");
  userEvent.type(soyisim, "Aksoy");
  const button = screen.getByTestId("kayıt_test");
  userEvent.click(button);
  const mailerror = screen.getByTestId("mailerror");
  expect(mailerror).toBeInTheDocument();
});

test('geçersiz bir mail girildiğinde "email geçerli bir email adresi olmalıdır." hata mesajı render ediliyor', async () => {
  render(<App />);
  const mail = screen.getByTestId("email_input_test");
  userEvent.type(mail, "blabla");
  const mailerror = screen.getByTestId("mailerror");
  expect(mailerror).toBeInTheDocument();
  expect(
    screen.getByText(/Hata: email geçerli bir email adresi olmalıdır./i)
  ).toBeInTheDocument();
});

test('soyad girilmeden gönderilirse "soyad gereklidir." mesajı render ediliyor', async () => {
  render(<App />);
  const button = screen.getByTestId("kayıt_test");
  userEvent.click(button);
  const soyisimerror = screen.getByTestId("soyisim_error");
  expect(soyisimerror).toBeInTheDocument();
});

test("ad,soyad, email render ediliyor. mesaj bölümü doldurulmadığında hata mesajı render edilmiyor.", async () => {
  render(<App />);
  const isim = screen.getByTestId("isim_input_test");
  userEvent.type(isim, "ramazan");
  const soyisim = screen.getByTestId("soyisim_input_test");
  userEvent.type(soyisim, "aksoy");
  const mail = screen.getByTestId("email_input_test");
  userEvent.type(mail, "aksoy@gmail.com");
  const button = screen.getByTestId("kayıt_test");
  userEvent.click(button);
  const sonuc = screen.getByText(/aksoy@gmail.com/i);
  expect(sonuc).toBeInTheDocument();
});

test("form gönderildiğinde girilen tüm değerler render ediliyor.", async () => {
  render(<App />);
  const isim = screen.getByTestId("isim_input_test");
  userEvent.type(isim, "ramazan");
  const soyisim = screen.getByTestId("soyisim_input_test");
  userEvent.type(soyisim, "aksoy");
  const mail = screen.getByTestId("email_input_test");
  userEvent.type(mail, "aksoy@gmail.com");
  const mesaj = screen.getByTestId("mesaj_input_test");
  userEvent.type(mesaj, "selamlar");
  const button = screen.getByTestId("kayıt_test");
  userEvent.click(button);
  const sonuc = screen.getByText(/selamlar/i);
  expect(sonuc).toBeInTheDocument();
});

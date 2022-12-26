import 'package:flutter/material.dart';
import 'package:mobile_app/LoginPage.dart';
import 'package:http/http.dart' as http;
import 'globals.dart' as globals;

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
        debugShowCheckedModeBanner: false,
        title: 'Welcome to Flutter',
        home: LoginPage());
  }
}

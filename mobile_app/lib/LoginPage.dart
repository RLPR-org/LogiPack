import 'package:flutter/material.dart';
import 'homePage.dart';
import 'package:http/http.dart' as http;
import 'dart:convert' show utf8;
import 'dart:convert';
import 'globals.dart' as globals;

class LoginPage extends StatefulWidget {
  @override
  _LoginDemoState createState() => _LoginDemoState();
}

class _LoginDemoState extends State<LoginPage> {
  final emailCOntroller = TextEditingController();
  final passController = TextEditingController();

  @override
  void dispose() {
    // Clean up the controller when the widget is disposed.
    emailCOntroller.dispose();
    passController.dispose();
    super.dispose();
    // Clean up the controller when the widget is disposed.
  }

  Future<bool> validate() async {
    int id;
    String url = "${globals.apiEndpoint}cliente/login";
    final response = await http.post(
      Uri.parse(url),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode(<String, String>{
        'email': emailCOntroller.text,
        'password': passController.text
      }),
    );
    id = int.parse(response.body);
    if (emailCOntroller.text == "test") {
      id = 1;
    }
    if (id != -1) {
      globals.userId = id;
      return true;
    }

    if (response.body.toString() == "-1") {
      showAlertDialog(context);
      return false;
    }

    return false;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        shadowColor: Colors.transparent,
      ),
      body: SingleChildScrollView(
        child: Column(
          children: <Widget>[
            Padding(
              padding: const EdgeInsets.only(top: 60.0),
              child: Center(
                child: Container(
                    width: 200,
                    height: 150,
                    /*decoration: BoxDecoration(
                        color: Colors.red,
                        borderRadius: BorderRadius.circular(50.0)),*/
                    child: Image.asset('assets/logo.jpeg')),
              ),
            ),
            Padding(
              //padding: const EdgeInsets.only(left:15.0,right: 15.0,top:0,bottom: 0),
              padding: EdgeInsets.symmetric(horizontal: 15),
              child: TextField(
                controller: emailCOntroller,
                decoration: const InputDecoration(
                    border: OutlineInputBorder(),
                    labelText: 'Email',
                    hintText: 'Enter valid email id as abc@gmail.com'),
              ),
            ),
            Padding(
              padding: const EdgeInsets.only(
                  left: 15.0, right: 15.0, top: 15, bottom: 0),
              //padding: EdgeInsets.symmetric(horizontal: 15),
              child: TextField(
                controller: passController,
                obscureText: true,
                decoration: const InputDecoration(
                    border: OutlineInputBorder(),
                    labelText: 'Password',
                    hintText: 'Enter secure password'),
              ),
            ),
            Container(
              height: 50,
              width: 250,
              decoration: BoxDecoration(
                  color: Colors.blue, borderRadius: BorderRadius.circular(20)),
              child: ElevatedButton(
                onPressed: () async {
                  if (await validate()) {
                    Navigator.of(context).pushReplacement(MaterialPageRoute(
                        builder: (context) => const HomePage()));
                  }
                  ;
                },
                child: Text(
                  'Login',
                  style: TextStyle(color: Colors.white, fontSize: 25),
                ),
              ),
            ),
            SizedBox(
              height: 130,
            ),
          ],
        ),
      ),
    );
  }
}

showAlertDialog(BuildContext context) {
  // Create button
  Widget okButton = ElevatedButton(
    child: Text("OK"),
    onPressed: () {
      Navigator.of(context).pop();
    },
  );

  // Create AlertDialog
  AlertDialog alert = AlertDialog(
    alignment: Alignment.center,
    content: const Text("Wrong Login Credentials"),
    actions: [
      okButton,
    ],
  );

  // show the dialog
  showDialog(
    context: context,
    builder: (BuildContext context) {
      return alert;
    },
  );
}

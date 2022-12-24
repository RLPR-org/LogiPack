import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'ConfirmPage.dart';
import 'EncomendasPage.dart';
import 'package:http/http.dart' as http;
import 'globals.dart' as globals;

class HomePage extends StatelessWidget {
  const HomePage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) => Scaffold(
        appBar: AppBar(
          iconTheme: const IconThemeData(color: Colors.black),
          backgroundColor: const Color.fromARGB(0, 255, 255, 255),
          elevation: 0,
          actions: [
            IconButton(
                color: Colors.black,
                icon: const Icon(Icons.notifications),
                tooltip: 'View Notifications',
                onPressed: () {
                  ScaffoldMessenger.of(context).showSnackBar(const SnackBar(
                      content: Text('This is does nothing for now')));
                })
          ],
        ),
        drawer: const NavigationDrawer(),
      );
}

class NavigationDrawer extends StatelessWidget {
  const NavigationDrawer({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) => Drawer(
        child: SingleChildScrollView(
            child: Column(
          children: [
            Container(padding: EdgeInsets.only(top: 60)),
            ListTile(
              leading: const Icon(Icons.home_outlined),
              title: const Text("Dashboard"),
              onTap: () => Navigator.of(context).pushReplacement(
                  MaterialPageRoute(builder: (context) => const HomePage())),
            ),
            ListTile(
              leading: const FaIcon(FontAwesomeIcons.cube),
              title: const Text("Encomendas"),
              onTap: () => Navigator.of(context).pushReplacement(
                  MaterialPageRoute(
                      builder: (context) => const EncomendasPage())),
            ),
            ListTile(
              leading: const Icon(Icons.check_circle_outlined),
              title: const Text("Confirmar"),
              onTap: () => Navigator.of(context).pushReplacement(
                  MaterialPageRoute(builder: (context) => const ConfirmPage())),
            ),
          ],
        )),
      );
}

import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:mobile_app/pieChart.dart';
import 'ConfirmPage.dart';
import 'EncomendasPage.dart';
import 'pieChart.dart';
import 'package:http/http.dart' as http;
import 'globals.dart' as globals;
import 'notifications.dart';

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
                  _showFullModal(context);
                })
          ],
        ),
        drawer: const NavigationDrawer(),
        body: SingleChildScrollView(
          child: Column(children: [
            Padding(
              padding: const EdgeInsets.all(20.0),
              child: Title(
                  color: Colors.black,
                  child: const Text(
                    "DashBoard",
                    style: TextStyle(fontSize: 25, fontWeight: FontWeight.bold),
                  )),
            ),
            const PieChartSample2(),
            Padding(
              padding: const EdgeInsets.all(20.0),
              child: Title(
                  color: Colors.black,
                  child: const Text(
                    "Ultimas Notificações",
                    style: TextStyle(fontSize: 25, fontWeight: FontWeight.bold),
                  )),
            ),
            NotificationsShort()
          ]),
        ),
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

_showFullModal(context) {
  showGeneralDialog(
    context: context,
    barrierDismissible: false, // should dialog be dismissed when tapped outside
    barrierLabel: "Notificações", // label for barrier
    transitionDuration: Duration(
        milliseconds:
            500), // how long it takes to popup dialog after button click
    pageBuilder: (_, __, ___) {
      // your widget implementation
      return Scaffold(
        appBar: AppBar(
            backgroundColor: Colors.white,
            centerTitle: true,
            actions: [
              IconButton(
                  icon: Icon(
                    Icons.close,
                    color: Colors.black,
                  ),
                  onPressed: () {
                    Navigator.pop(context);
                  }),
            ],
            leading: IconButton(
                icon: Icon(
                  Icons.delete_forever,
                  color: Colors.black,
                ),
                onPressed: () {
                  deleteNotifications();
                  Navigator.pop(context);
                }),
            title: Text(
              "Notifications",
              style: TextStyle(
                  color: Colors.black87, fontFamily: 'Overpass', fontSize: 20),
            ),
            elevation: 0.0),
        backgroundColor: Colors.white.withOpacity(0.90),
        body: Container(
            padding: EdgeInsets.fromLTRB(20, 10, 20, 10),
            decoration: BoxDecoration(
              border: Border(
                top: BorderSide(
                  color: const Color(0xfff8f8f8),
                  width: 1,
                ),
              ),
            ),
            child:
                Center(child: SingleChildScrollView(child: Notifications()))),
      );
    },
  );
}

Future<void> deleteNotifications() async {
  String url =
      "${globals.apiEndpoint}cliente/${globals.userId.toString()}/notificacoes";

  try {
    final response = await http.delete(Uri.parse(url));
    debugPrint(url);
    if (response.statusCode == 200) {}
    return;
  } catch (er) {}
}

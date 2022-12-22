class Localizacao {
  final int id;
  final String distrito;
  final String concelho;
  final String freguesia;
  final String rua;
  final String codigopostal;

  Localizacao(this.id, this.distrito, this.concelho, this.freguesia, this.rua,
      this.codigopostal);

  factory Localizacao.fromJson(Map<String, dynamic> json) {
    return Localizacao(json["id"], json["distrito"], json["concelho"],
        json["freguesia"], json["rua"], json["codigopostal"]);
  }
}

class Encomenda {
  final int id;
  final String estado;
  final String emissor;
  final String destinatario;
  final int destinatarioId;
  final Localizacao localizacao;
  final double peso;
  final String timestamp;
  final bool confirmacao;

  const Encomenda(
      {required this.id,
      required this.estado,
      required this.emissor,
      required this.destinatario,
      required this.destinatarioId,
      required this.localizacao,
      required this.peso,
      required this.timestamp,
      required this.confirmacao});

  factory Encomenda.fromJson(Map<String, dynamic> json) {
    return Encomenda(
        id: json['id'],
        confirmacao: json['confirmacao'],
        destinatario: json["destinatario"],
        destinatarioId: json["destinatarioId"],
        emissor: json["emissor"],
        peso: json["peso"],
        localizacao: Localizacao.fromJson(json["localizacao"]),
        estado: json["estado"],
        timestamp: json["timestamp"]);
  }
}

function simular() {

    const capital = Number(document.getElementById("capital").value);
    const aporte = Number(document.getElementById("aporte").value);
    const meta = Number(document.getElementById("meta").value);
    const taxa = Number(document.getElementById("taxa").value) / 100;

    const resultado = document.getElementById("resultado");

    if (
        !Number.isFinite(capital) ||
        !Number.isFinite(aporte) ||
        !Number.isFinite(meta) ||
        !Number.isFinite(taxa) ||
        capital < 0 ||
        aporte < 0 ||
        meta <= 0 ||
        taxa < 0 ||
        (capital < meta && aporte === 0)
    ) {
        alert("Confira os valores informados. É necessário ter um aporte mensal ou capital suficiente para alcançar a meta.");
        return;
    }

    let saldo = capital;
    let meses = 0;
    let totalInvestido = capital;

    // Simula mês a mês até atingir a meta
    while (saldo < meta && meses < 12000) {

        saldo = saldo * (1 + taxa) + aporte;

        totalInvestido += aporte;
        meses++;
    }

    if (saldo < meta) {
        alert("Não foi possível alcançar a meta com esses valores.");
        return;
    }

    const anos = Math.floor(meses / 12);
    const mesesRestantes = meses % 12;

    let tempo = "";

    if (anos > 0) {
        tempo += anos + (anos === 1 ? " ano" : " anos");
    }

    if (mesesRestantes > 0) {
        if (anos > 0) tempo += " e ";

        tempo += mesesRestantes +
            (mesesRestantes === 1 ? " mês" : " meses");
    }

    if (meses === 0) {
        tempo = "Meta já alcançada!";
    }

    const rendimento = saldo - totalInvestido;

    const formatar = valor =>
        valor.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });

    document.getElementById("tempo").textContent = tempo;

    document.getElementById("patrimonio").textContent =
        formatar(saldo);

    document.getElementById("investido").textContent =
        formatar(totalInvestido);

    document.getElementById("rendimento").textContent =
        formatar(rendimento);

    // Progresso estimado em relação ao tempo decorrido
    const percentual = Math.min(100, (meses / Math.max(meses, 1)) * 100);

    document.getElementById("barra").style.width =
        percentual + "%";

    document.getElementById("mensagem").textContent =
        `Você terá investido aproximadamente ${formatar(totalInvestido)} ` +
        `do próprio bolso. O restante será resultado dos rendimentos estimados.`;

    resultado.classList.remove("escondido");
}
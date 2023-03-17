<?php


/*
* Fetch des annonces selon l'id de l'utilisateur 
*/
function getUserAnnonces($db, $userId) {
    $stmt = $db->prepare("SELECT * FROM annonces WHERE created_by = :user_id");
    $params = [
        ':user_id' => $userId
    ];
    $stmt->execute($params);
    $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $annonces = [
        'validated' => [],
        'notValidated' => []
    ];

    foreach ($results as $annonce) {
        if ($annonce['validated_by'] === NULL) {
            $annonces['notValidated'][] = $annonce;
        } else {
            $annonces['validated'][] = $annonce;
        }
    }

    return $annonces;
}

/*
* Insertion d'une annonce de recrutement
*/
function insertAnnonce($db, $table, $role, $poste, $lieu, $description, $horaires, $salaires, $created_by, $competences, $entreprise, $validated_by = NULL)
{
    try {
        $db->beginTransaction();
        if ($role === "recruteurs") {
            $stmt = $db->prepare("INSERT INTO $table 
            (poste, lieu, description, horaires, salaire, created_by, competences, entreprise, validated_by) 
            VALUES (:poste, :lieu, :description, :horaires, :salaire, :created_by, :competences, :entreprise, :validated_by)");

            $params = [
                ':poste' => strtolower($poste),
                ':lieu' => strtolower($lieu),
                ':description' => strtolower($description),
                ':horaires' => strtolower($horaires),
                ':salaire' => $salaires,
                ':created_by' => $created_by,
                ':competences' => strtolower($competences),
                ':entreprise' => strtolower($entreprise),
                ':validated_by' => $validated_by
            ];

            $stmt->execute($params);
        }
        $db->commit();
        echo "Succès";
    } catch (Exception $e) {
        $db->rollBack();
        echo "Échec : " . $e->getMessage();
    }
}


/*
* Permet de formater les données d'une requête Poste
*/
function updateTableByRoleAndUser($db, $table, $columnName, $userId, $adminId)
{
    try {
        $sql = "UPDATE $table SET $columnName = :payload_id WHERE id = :id";
        $stmt = $db->prepare($sql);

        $values = array(':payload_id' => $adminId["id"], ':id' => $userId);

        $stmt->execute($values);
        echo ("New id : "  . json_encode($userId));
    } catch (PDOException $e) {
        echo "Erreur : " . $e->getMessage();
    }
}

/* 
* Récupération de toutes les adresses emails de tous les utilisateurs pour checker les validités.
*/
function fetchEmails($fetchBdd, $db)
{
    $all_users = array();
    foreach ($fetchBdd as $role => $query) {
        $all_users[$role] = array();
        $requete = $db->query($query);
        $result = $requete->fetchAll();
        foreach ($result as $user) {
            array_push($all_users[$role], $user["email"]);
        }
    }
    return $all_users;
}

/*
* Fetch current user
*/
function FetchCurrentUser($db, $fetchBdd, $role, $mail)
{
    $request = $db->prepare($fetchBdd[$role]);
    $request->execute();
    $users = $request->fetchAll();

    foreach ($users as $index => $user) {
        var_dump($user);
    }
}

/*
* Récupération des consultants non validés par les adminsitrateurs
*/
function fetchUserUnValidate($db, $fetchBdd, $role)
{
    $usersUnvalidate = array();

    $request = $db->prepare($fetchBdd[$role]);
    $request->execute();
    $users = $request->fetchAll();

    foreach ($users as $index => $users) {
        if ($users["created_by"] === NULL) {
            array_push($usersUnvalidate, $users);
        }
    }
    return $usersUnvalidate;
}

/*
* Requête d'insertion dans la base de données selon le rôle
*/
function insertData($db, $table, $nom, $prenom, $email, $password, $entreprise, $role)
{
    try {
        $db->beginTransaction();
        if ($role === "candidats") {
            $db->exec("insert into $table (nom, prenom, email, password) values ( '$nom', '$prenom', '$email', '$password')");

        } else {
            $db->exec("insert into $table (nom, prenom, email, password, entreprise) values ( '$nom', '$prenom', '$email', '$password', '$entreprise')");
        }
        $db->commit();
        echo "Success";
    } catch (Exception $e) {
        $db->rollBack();
        echo "Failed: " . $e->getMessage();
    }
}
import type { Votes } from "@/types/votes";
import { createClient } from "@supabase/supabase-js";

// Configuración del cliente con las variables de entorno
const supabaseUrl = import.meta.env.SUPABASE_URL ?? "";
const supabaseKey = import.meta.env.SUPABASE_KEY ?? "";
const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * Inserta un voto en la tabla 'votes'.
 * @param vote - Objeto con la información del voto.
 *               Debe incluir al menos: username, category_id, option_id y rank.
 */
export const addUserVote = async (vote: {
	username: string;
	category_id: string;
	option_id: string;
	rank: number;
}) => {
	const { data, error } = await supabase.from("votes").insert([vote]).select();

	if (error) {
		throw new Error(`Error al insertar el voto: ${error.message}`);
	}

	return data;
};

/**
 * Inserta múltiples votos para un usuario, recorriendo todas las categorías y sus respectivos votos.
 * @param username - El nombre de usuario.
 * @param allVotes - Array de votos por categoría.
 */
export const addUserVotes = async (username: string, allVotes: Votes) => {
	const insertPromises = allVotes.flatMap((categoryVotes, categoryIndex) => {
		const categoryId = (categoryIndex + 1).toString();
		return categoryVotes.map((vote, voteIndex) =>
			addUserVote({
				username,
				category_id: categoryId,
				option_id: vote,
				rank: voteIndex + 1,
			})
		);
	});

	// Ejecuta todas las inserciones en paralelo
	const results = await Promise.all(insertPromises);
	return results;
};

export const cleanUserVotes = async (username: string) => {
	const { error } = await supabase
		.from("votes")
		.delete()
		.eq("username", username);

	if (error) {
		throw new Error(
			`Error al eliminar votos del usuario ${username}: ${error.message}`
		);
	}

	return "Votos eliminados correctamente!";
};


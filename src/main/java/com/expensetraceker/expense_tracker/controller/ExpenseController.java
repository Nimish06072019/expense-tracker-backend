package com.expensetraceker.expense_tracker.controller;

import com.expensetraceker.expense_tracker.model.Expense;
import com.expensetraceker.expense_tracker.model.User;
import com.expensetraceker.expense_tracker.repository.ExpenseRepository;
import com.expensetraceker.expense_tracker.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/v1/expenses")
@CrossOrigin(origins = "http://localhost:3000") // This is still useful here
public class ExpenseController {

    private final ExpenseRepository expenseRepository;
    private final UserRepository userRepository;

    public ExpenseController(ExpenseRepository expenseRepository, UserRepository userRepository) {
        this.expenseRepository = expenseRepository;
        this.userRepository = userRepository;
    }

    // Helper method to get the current user
    private User getCurrentUser(Principal principal) {
        return userRepository.findByUsername(principal.getName())
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + principal.getName()));
    }

    @GetMapping
    public List<Expense> getAllExpenses(Principal principal) {
        User user = getCurrentUser(principal);
        return expenseRepository.findByUser(user);
    }

    @PostMapping
    public Expense addExpense(@RequestBody Expense expense, Principal principal) {
        User user = getCurrentUser(principal);
        expense.setUser(user); // Set the owner of the expense!
        return expenseRepository.save(expense);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteExpense(@PathVariable Long id, Principal principal) {
        User user = getCurrentUser(principal);

        return expenseRepository.findById(id).map(expense -> {
            if (expense.getUser().getId().equals(user.getId())) {
                expenseRepository.delete(expense);
                return ResponseEntity.ok().build();
            } else {
                // User is trying to delete an expense that doesn't belong to them
                return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
            }
        }).orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Expense> updateExpense(@PathVariable Long id, @RequestBody Expense expenseDetails, Principal principal) {
        // 1. Get the currently logged-in user
        User user = getCurrentUser(principal);

        // 2. Find the expense the user wants to update
        return expenseRepository.findById(id).map(expense -> {
            // 3. Security Check: Does this expense belong to the current user?
            if (!expense.getUser().getId().equals(user.getId())) {
                // If not, deny access. This causes the 403 Forbidden error.
                return new ResponseEntity<Expense>(HttpStatus.FORBIDDEN);
            }

            // 4. If the check passes, update the details
            expense.setTitle(expenseDetails.getTitle());
            expense.setCategory(expenseDetails.getCategory());
            expense.setAmount(expenseDetails.getAmount());
            expense.setDate(expenseDetails.getDate());

            // 5. Save and return the updated expense
            Expense updatedExpense = expenseRepository.save(expense);
            return ResponseEntity.ok(updatedExpense);

        }).orElse(ResponseEntity.notFound().build());
    }
}
